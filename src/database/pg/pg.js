const { Pool } = require('pg');
const { development } = require('../../config/pg');
const logger = require('../../middleware/logger');

const pool = new Pool(development);

pool.on('error', (err) => {
  logger.warn('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('connect', (client) => {
  logger.info(
    `pool connected to ${client.user}@${client.host} using database ${client.database} on port ${client.port}`
  );
});

module.exports = pool;
