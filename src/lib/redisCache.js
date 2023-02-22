const { redisClient } = require('../middleware/redis.middleware');
const logger = require('../middleware/logger');

const setCache = async (key, value) => {
  try {
    const cacheKey = key.replace(/[^\w]/g, '_');
    const result = await redisClient.setex(key, 60, JSON.stringify(value));
    return result;
  } catch (err) {
    logger.error(`Error setting cache: ${err}`);
  }
};

module.exports = setCache;
