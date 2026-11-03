/**
 * Fetch data from URL with timeout and retry logic for transient errors
 * @param {string} url - Target URL
 * @param {number} maxRetries - Max retry attempts (default: 3)
 * @param {number} retryDelay - Delay between retries in ms (default: 1000)
 * @returns {Promise<any>} Response data
 */
async function fetchData(url, maxRetries = 3, retryDelay = 500, timeoutMs = 10000) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const headers = {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Code-Tantra-Backend/1.0'
      };

      if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      const response = await fetch(url, {
        headers,
        signal: controller.signal
      });

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        error.status = response.status;
        throw error;
      }

      return await response.json();
    } catch (error) {
      lastError = error;

      const retryable = error.name === 'AbortError' ||
        error.code === 'ECONNRESET' ||
        (error.status >= 500 && error.status < 600);

      if (!retryable || attempt === maxRetries) {
        throw error;
      }

      const delay = retryDelay * 2 ** (attempt - 1);
      console.warn(`[fetchData] Retry ${attempt}/${maxRetries} in ${delay}ms: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, delay));
    } finally {
      clearTimeout(timeout);
    }
  }
  
  throw lastError;
}

module.exports = { fetchData };
