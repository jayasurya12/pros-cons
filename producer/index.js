require('dd-trace').init();
require('dotenv').config();


const express = require('express');
const os = require('os');
const pidusage = require('pidusage');
const jobQueue = require('./queue');

const app = express();
const PORT = 3000;

// Helper to collect system stats
async function getSystemLog() {
  const stats = await pidusage(process.pid);
  return {
    type: 'system_log',
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime(),
    memoryUsageMB: (stats.memory / 1024 / 1024).toFixed(2),
    cpuUsage: stats.cpu.toFixed(2),
    timestamp: new Date().toISOString(),
  };
}

// Auto-send logs every 5 seconds
setInterval(async () => {
  try {
    const jobData = await getSystemLog();
    await jobQueue.add('task', jobData);
    console.log('📦 Auto Job added:', jobData);
  } catch (err) {
    console.error('❌ Auto Job error:', err.message);
  }
}, 5000);

// 🔹 Routes
app.get('/', (req, res) => {
  res.send('✅ Producer running. Visit /produce or /stats');
});

app.get('/produce', async (req, res) => {
  try {
    const jobData = await getSystemLog();
    await jobQueue.add('task', jobData);
    res.json({ message: '📦 Manual job added', jobData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/stats', async (req, res) => {
  try {
    const stats = await getSystemLog();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Producer server is running at http://localhost:${PORT}`);
});