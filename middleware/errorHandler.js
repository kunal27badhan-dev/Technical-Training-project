/**
 * Global error handler middleware
 * Catches errors and returns structured JSON response
 */
function errorHandler(err, req, res, next) {
  // Fetch API errors (non-ok responses)
  if (err.message && err.message.includes('HTTP')) {
    const statusMatch = err.message.match(/HTTP (\d+)/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 500;
    
    return res.status(status).json({
      error: err.message,
      status: status
    });
  }
  
  // Validation/custom errors with status
  const status = err.status || err.statusCode || 500;
  
  // Log server errors
  if (status >= 500) {
    console.error('[Error Handler]', {
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method
    });
  }
  
  res.status(status).json({
    error: err.message || 'Internal server error',
    status: status
  });
}

module.exports = errorHandler;
