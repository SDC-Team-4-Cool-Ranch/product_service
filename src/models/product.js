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
  getDetails: async (product_id) => {
    try {
      const results = await pool.query(
        `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, pf.feature, pf.value FROM products p LEFT JOIN product_features pf ON p.id = pf.product_id WHERE p.id = $1
      `,
        [product_id]
      );

      return results;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve product info in models');
    }
  },
  getStyles: async (product_id) => {
    // Subqueries to build out object
    // select json_build_object(
    //   'product_id', product_id::varchar,
    //   'results', (
    //     select json_agg(
    //       json_build_object
    //           ('id', id,
    //           'name', name,
    //           'original_price', original_price,
    //           'sale_price', sale_price,
    //           'default?', default_style,
    //           'photos', (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) as photos FROM photos WHERE style_id = styles.id),
    //           'skus', (SELECT json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) as skus FROM skus WHERE style_id = styles.id)))
    //   )
    // ) as data
    // FROM styles
    // WHERE product_id = 1
    // GROUP BY product_id;

    try {
      const results = await pool.query(
        'SELECT s.*, p.url, p.thumbnail_url, k.id as sku_id, k.size, k.quantity FROM styles s LEFT JOIN skus k ON s.id = k.style_id LEFT JOIN photos p ON s.id = p.style_id WHERE s.product_id = $1;',
        [product_id]
      );
      return results;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve styles in models');
    }
  },
  getRelatedProducts: async (product_id) => {
    try {
      const results = await pool.query(
        'SELECT related_product_id FROM related_products WHERE product_id = $1',
        [product_id]
      );

      return results;
    } catch (err) {
      logger.error('Error while querying related_products table', err);
      throw new Error('Failed to retrieve related product IDs in models');
    }
  },
};
