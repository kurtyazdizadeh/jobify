require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/saved-job/:sort', (req, res, next) => {
  const { sort } = req.params;
  const sql = `
    SELECT    "user_job_id", "job_status", "job_priority", "job_info", "date_applied"
    FROM      "UserSelectedJob"
    ORDER BY  ${sort};
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/specific-job/:id', (req, res, next) => {
  const { id } = req.params;
  if (id <= 0) {
    res.status(400).send({ error: `cannot get user at id of ${id}` });
    return;
  }
  const sql = `
  SELECT "job_status",
         "date_applied",
         "job_priority",
         "files_id",
         "interview_date",
         "job_info"
  FROM "UserSelectedJob"
  WHERE "user_job_id" = $1
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(400).json({ error: `user id of ${id} not found` });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/notes/:jobId', (req, res, next) => {
  const { jobId } = req.params;
  if (jobId <= 0) {
    res.status(400).json({ error: 'job id must be a positive integer' });
  }
  const sql = `
  SELECt "notes"."note_title",
         "notes"."note_content",
         "notes"."date_posted",
         "JobNotes"."job_note_id",
         "JobNotes"."note_id"
    FROM "notes"
    JOIN "JobNotes" using ("note_id")
   WHERE "user_job_id" = $1
  `;

  const params = [jobId];

  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(200).json({ empty: `there are no notes for user_job_id ${jobId}` });
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch(err => next(err));
});

app.delete('/api/saved-job/:id', (req, res, next) => {
  const { id } = req.params;
  if (id <= 0) {
    return res.status(400).json({
      error: '"jobId" must be a positive integer'
    });
  }
  const sql = `
  DELETE FROM "UserSelectedJob"
  WHERE       "user_job_id" = $1
  RETURNING *;
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      const jobResult = result.rows;
      if (!jobResult[0]) {
        res.status(404).json({
          error: `jobId ${id} is not found`
        });
      } else {
        res.status(200).json(jobResult);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.post('/api/status/:id', (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  if (id <= 0) {
    return res.status(404).json({ error: 'id must be a positive integer' });
  } else if (!status) {
    return res.status(404).json({ error: 'body is a required field' });
  }

  const sql = `
  update "UserSelectedJob"
     set "job_status" = $1
   where "user_job_id" = $2
   returning "job_status"
  `;
  const params = [status, id];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({ error: 'something happened while sending request' });
      } else {
        res.status(202).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/location/:lat-:long', (req, res, next) => {
  const { lat, long } = req.params;

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_MAPS_API}`)
    .then(response => response.json())
    .then(location => res.json(location))
    .catch(err => console.error(err));
});

app.get('/api/search-jobs/:params', (req, res, next) => {
  const { params } = req.params;
  const pageNum = params.slice(params.indexOf('=') + 1, params.indexOf('&'));
  const actualParams = params.slice(params.indexOf('&'));

  const queryString = `app_id=${process.env.ADZUNA_ID}&app_key=${process.env.ADZUNA_KEY}` + actualParams;

  fetch(`https://api.adzuna.com/v1/api/jobs/us/search/${pageNum}?${queryString}`)
    .then(response => response.json())
    .then(results => res.json(results))
    .catch(err => console.error(err));
});

app.post('/api/save-job/', (req, res, next) => {
  const jobDetails = req.body;

  const sql = `
    insert into "UserSelectedJob" ("user_job_id", "user_id", "job_status", "job_priority", "job_info")
    values (default, 1, default, default, $1)
    returning *;
  `;
  const params = [jobDetails];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({ error: 'something went wrong' });
      } else {
        res.status(201).json(result);
      }
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
