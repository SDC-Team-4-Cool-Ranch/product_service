const { productModel } = require('../models');
const logger = require('../middleware/logger');

module.exports = {
  getProducts: async (params) => {
    const { page, count } = params;
    try {
      const model = await productModel.getProducts(page, count);
      return model;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve products in services');
    }
  },
  getDetails: async () => {
    productModel.getDetails();
  },
  getStyles: async () => {
    productModel.getStyles();
  },
  getRelatedProducts: async (product_id) => {
    try {
      const model = await productModel.getRelatedProducts(product_id);
      const relatedProductIds = model.rows.map((row) => row.related_product_id);
      return relatedProductIds;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve related products in services');
    }
  },
};
