require('dd-trace').init({ service: process.env.DATADOG_SERVICE });

const express = require('express');
const jobQueue = require('./queue');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/produce', async (req, res) => {
  const { data } = req.body;
  await jobQueue.add('task', { data });
  console.log('Job added:', data);
  res.send('Job added');
});

app.listen(3000, () => {
  console.log('Producer running on http://localhost:3000');
});
