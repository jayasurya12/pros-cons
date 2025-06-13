require('dd-trace').init();
require('dotenv').config();

const express = require('express');
const jobQueue = require('./queue');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('✅ Producer Server is running & generating jobs every 5 seconds!');
});

app.listen(PORT, () => {
  console.log(`🚀 Producer server started on http://localhost:${PORT}`);

  // Start auto job generation after server is up
  setInterval(() => {
    const jobData = {
      data: `Auto Job @ ${new Date().toISOString()}`
    };
    jobQueue.add('task', jobData)
      .then(() => console.log('📦 Job added:', jobData.data))
      .catch(err => console.error('❌ Error adding job:', err.message));
  }, 5000);
});
