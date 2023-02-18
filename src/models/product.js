const pool = require('../database/pg');
const logger = require('../middleware/logger');

module.exports = {
  getProducts: async (page = 1, count = 10) => {
    try {
      const results = await pool.query(
        'SELECT * FROM products ORDER BY id OFFSET $1 LIMIT $2',
        [(page - 1) * count, count]
      );
      return results.rows;
    } catch (err) {
      logger.error('Error while querying products table', err);
      throw new Error('Failed to retrieve products in models');
    }
  },
  getDetails: async () => {},
  getStyles: async () => {},
  getRelatedProducts: async (product_id) => {
    try {
      const results = await pool.query(
        'SELECT related_product_id FROM related_products WHERE product_id = $1',
        [product_id]
      );

      return results;
    } catch (err) {
      logger.error('Error while querying related_products table', err);
      throw new Error('Failed to retrieve related product IDs');
    }
  },
};
