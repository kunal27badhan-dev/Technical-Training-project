/**
 * Parse raw API data into clean item objects
 * @param {Array|Object} rawData - Raw API response
 * @returns {Array} Parsed items with { id, title, score, date }
 */
function parseItems(rawData) {
  // Handle case where data might be wrapped in a property
  const items = Array.isArray(rawData) ? rawData : rawData.items || rawData.data || [];
  
  return items.map(item => ({
    id: item.id || item._id || null,
    title: item.title || item.name || '',
    score: parseFloat(item.score || item.rating || item.points || 0),
    date: item.date || item.created_at || item.createdAt || new Date().toISOString()
  }));
}

module.exports = { parseItems };
