const { redisClient } = require('../middleware/redis.middleware');
const logger = require('./middleware/logger');

const setCache = async (cacheKey, value) => {
  try {
    const result = await redisClient.setex(key, 60, JSON.stringify(value));
    return result;
  } catch (err) {
    logger.error(`Error setting cache: ${err}`);
  }
};
