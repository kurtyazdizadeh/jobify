require('dotenv/config');
const express = require('express');

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

app.get('/api/saved-job', (req, res, next) => {
  const sql = `
    SELECT    "user_job_id", "job_status", "job_priority", "job_info"
    FROM      "UserSelectedJob"
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
  WHERE "user_job_id" = ${id}
  `;
  db.query(sql)
    .then(result => {
      if (!result.rows[0]) {
        res.status(400).json({ error: `user id of ${id} not found` });
      } else {
        res.status(200).json(result.rows[0]);
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
