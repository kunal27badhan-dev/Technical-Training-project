require('dotenv').config();

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  throw new Error('Missing required environment variable: API_URL');
}

try {
  new URL(apiUrl);
} catch {
  throw new Error('API_URL must be a valid URL');
}

const port = Number.parseInt(process.env.PORT || '3000', 10);
const topN = Number.parseInt(process.env.TOP_N || '10', 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

if (!Number.isInteger(topN) || topN < 1) {
  throw new Error('TOP_N must be a positive integer');
}

/**
 * Centralized configuration object
 */
const config = {
  apiUrl,
  port,
  topN,
  nodeEnv: process.env.NODE_ENV || 'development',
  githubToken: process.env.GITHUB_TOKEN || ''
};

module.exports = config;
