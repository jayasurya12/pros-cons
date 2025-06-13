const { Worker } = require('bullmq');
const connection = require('../shared/redis');

module.exports = { Worker, connection };
