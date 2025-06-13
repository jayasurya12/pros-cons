// require('dd-trace').init({ service: process.env.DATADOG_SERVICE });
require('dotenv').config();

const { Worker, connection } = require('./queue');

const worker = new Worker('jobs', async job => {

  if (job.data.type === 'system_log') {
    console.log(`🖥️ [System Log] ${job.data.hostname}: CPU ${job.data.cpuUsage}% | Mem ${job.data.memoryUsageMB}MB | Uptime ${Math.round(job.data.uptime / 60)} mins`);
  } else {
    console.log(`Processing job: ${JSON.stringify(job.data)}`);
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
}, { connection });

console.log('Consumer is running...');
