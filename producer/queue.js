const { Queue } = require('bullmq');
const connection = require('../shared/redis');

const jobQueue = new Queue('jobs', { connection });
module.exports = jobQueue;
