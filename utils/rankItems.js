/**
 * Rank items by score and return top N
 * @param {Array} items - Array of items with score property
 * @param {number} topN - Number of top items to return
 * @returns {Array} Top N items sorted by score descending
 */
function rankItems(items, topN = 10) {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const limit = Math.max(0, Number.parseInt(topN, 10) || 0);

  return items
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

module.exports = { rankItems };
