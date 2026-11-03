const { fetchData } = require('../utils/fetchData');
const { parseItems } = require('../utils/parseItems');
const { rankItems } = require('../utils/rankItems');

/**
 * Get ranked data from external API
 * @param {string} url - API endpoint URL
 * @param {number} topN - Number of top results to return
 * @returns {Promise<Array>} Ranked items
 */
async function getRankedData(url, topN = 10) {
  // Fetch raw data
  const rawData = await fetchData(url);
  
  // Parse to clean format
  const parsedItems = parseItems(rawData);
  
  // Rank and return top N
  const rankedItems = rankItems(parsedItems, topN);
  
  return rankedItems;
}

module.exports = { getRankedData };
