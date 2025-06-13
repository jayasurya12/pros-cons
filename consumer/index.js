require('dd-trace').init({ service: process.env.DATADOG_SERVICE });
require('dotenv').config();

const { Worker, connection } = require('./queue');

const worker = new Worker('jobs', async job => {
  console.log(`Processing job: ${JSON.stringify(job.data)}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
}, { connection });

console.log('Consumer is running...');
