// shared/redis.js
const Redis = require('ioredis');
require('dotenv').config();

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null  // <-- THIS IS REQUIRED
});

module.exports = connection;
