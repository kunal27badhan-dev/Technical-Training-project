const express = require('express');
const path = require('path');
const config = require('./config');
const app = express();
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(express.static(__dirname, { maxAge: config.nodeEnv === 'production' ? '1d' : 0 }));

// Routes
app.use('/api', apiRoutes);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/frontend', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend.html'));
});

app.get('/issues', (req, res) => {
  res.sendFile(path.join(__dirname, 'issues.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log('\n========================================');
  console.log('🚀 Server running successfully!');
  console.log('========================================');
  console.log(`🏠 Home Page:       http://localhost:${config.port}/`);
  console.log(`🎯 Frontend:        http://localhost:${config.port}/frontend`);
  console.log(`📋 Issues Page:     http://localhost:${config.port}/issues`);
  console.log(`🔌 API Endpoint:    http://localhost:${config.port}/api/results`);
  console.log(`💚 Health Check:    http://localhost:${config.port}/health`);
  console.log('========================================');
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`API Source: ${config.apiUrl}`);
  console.log(`Top Results: ${config.topN}`);
  console.log('========================================\n');
});

module.exports = app;
