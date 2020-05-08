require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const gis = require('g-i-s');

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
  if (sort !== 'date_saved DESC' && sort !== 'date_saved ASC' && sort !== 'job_status ASC' &&
          sort !== 'job_status DESC' && sort !== 'job_priority ASC' && sort !== 'job_priority DESC') {
    res.status(400).send({ error: `Cannot sort by ${sort}` });
  }
  const sql = `
    SELECT    "user_job_id", "job_status", "job_priority", "job_info", "date_saved"
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
         "date_saved",
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
  SELECT "notes"."note_title",
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

app.post('/api/manual-save', (req, res, next) => {
  const job = req.body;
  if (!parseInt(job.rating, 10) || parseInt(job.rating, 10) < 0) {
    return res.status(400).json({
      error: 'rating must be a positive integer'
    });
  }
  if (!job.companyName) {
    return res.status(400).json({
      error: 'companyName must be included'
    });
  }
  if (!job.position) {
    return res.status(400).json({
      error: 'position must be included'
    });
  }
  const json = JSON.stringify({ company: job.companyName, title: job.position, location: job.location });
  const sql = `
    INSERT INTO "UserSelectedJob" ("user_job_id", "user_id", "job_status", "date_saved", "job_priority", "follow_up_date", "date_applied", "job_info")
    VALUES (default, 1, 'interested', default, $1, $2, $3, $4)
    returning *;
  `;
  const params = [job.rating, job.followUp, job.dateOfApplication, json];
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

app.post('/api/notes/', (req, res, next) => {
  const { title, content, category } = req.body;

  const sql = `
    insert into "notes" ("note_id", "note_title", "note_content", "note_type", "date_posted")
         values         (default, $1, $2, $3, default)
         returning *;
  `;
  const params = [title, content, category];

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

app.get('/api/notes/view/:category', (req, res, next) => {
  let { category } = req.params;
  switch (category) {
    case 'general':
      category = 'General Notes';
      break;
    case 'networking':
      category = 'Networking Events';
      break;
    case 'resume':
      category = 'Resume';
      break;
    default:
      break;
  }

  const sql = `
     select *
       from "notes"
      where "note_type" = $1
  `;
  const params = [category];

  db.query(sql, params)
    .then(result => res.status(200).json(result.rows))
    .catch(err => console.error(err));

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

app.post('/api/interview/:id', (req, res, next) => {
  const { id } = req.params;
  const { interview } = req.body;
  if (id <= 0) {
    return res.status(404).json({ error: 'id is a required field' });
  } else if (!interview) {
    return res.status(404).json({ error: 'interview date is a required field' });
  }
  const sql = `
  update "UserSelectedJob"
     set "interview_date" = $1
   where "user_job_id" = $2
  returning "interview_date"
  `;
  const params = [interview, id];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(400).json({ error: `there is no data at id ${id}` });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.post('/api/rating/:id', (req, res, next) => {
  const { id } = req.params;
  const { rating } = req.body;
  if (id <= 0) {
    return res.status(404).json({ error: 'id must be a positive intiger' });
  } else if (!rating) {
    return res.status(404).json({ error: 'rating is a required field' });
  }
  const sql = `
  update "UserSelectedJob"
     set "job_priority" = $1
   where "user_job_id" = $2
  returning "job_priority"
  `;
  const params = [rating, id];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({ error: `cannot find user job id ${id}` });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.post('/api/job-note/:id', (req, res, next) => {
  const { id } = req.params;
  const { noteTitle, note, noteType } = req.body;
  if (id <= 0 || !id) {
    return res.status(404).json({ error: `id is a required field expects integer but got ${id}` });
  } else if (!note || !noteType || !noteTitle) {
    return res.status(404).json({ error: 'noteTitle, note, and noteType are required in the body' });
  }

  const sql = `
  insert into "notes" ("note_title", "note_content", "note_type")
  values ($1, $2, $3)
  returning "note_title", "note_content", "note_id", "date_posted"
  `;
  const params = [noteTitle, note, noteType];

  db.query(sql, params)
    .then(result => {
      // eslint-disable-next-line camelcase
      const { note_content, note_title, note_id, date_posted } = result.rows[0];
      // eslint-disable-next-line camelcase
      if (!note_content || !note_title || !note_id) {
        return res.status(400).json({ error: 'internal server error' });
      }
      return {
        note_title: note_title,
        note_content: note_content,
        note_id: note_id,
        date_posted: date_posted
      };
    })
    .then(note => {
      const jobNotessql = `
      insert into "JobNotes" ("user_job_id", "note_id")
      values ($1, $2)
      `;
      const jobNotesParams = [id, note.note_id];
      db.query(jobNotessql, jobNotesParams)
        .then(data => {
          res.status(200).json(note);
        });
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

app.get('/api/logo/:company', (req, res, next) => {
  const { company } = req.params;
  const options = {
    searchTerm: `${company} logo`,
    queryStringAddition: 'as_st=y&tbm=isch&safe=images&tbs=isz:i,ic:trans,iar:s'
  };
  function log(err, results) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(results[0].url);
    }
  }
  gis(options, log);
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
