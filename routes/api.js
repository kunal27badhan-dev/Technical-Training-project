const express = require('express');
const router = express.Router();
const config = require('../config');
const { getRankedData } = require('../services/dataService');

/**
 * GET /api/results
 * Fetch, parse, and rank data from external API
 */
router.get('/results', async (req, res, next) => {
  try {
    const results = await getRankedData(config.apiUrl, config.topN);
    
    res.json({
      success: true,
      count: results.length,
      data: results
    });
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
