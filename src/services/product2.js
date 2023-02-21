const { mongoModel } = require('../models');
const logger = require('../middleware/logger');

module.exports = {
  getProducts: async (params) => {
    const { page, count } = params;
    try {
      const model = await mongoModel.getProducts(page, count);
      return model;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve products in services');
    }
  },
  getDetails: async (product_id) => {
    try {
      const model = await mongoModel.getDetails(product_id);
      return model;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve product details in services');
    }
  },
  getStyles: async (product_id) => {
    try {
      const model = await mongoModel.getStyles(product_id);
      return model;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve styles in services');
    }
  },
  getRelatedProducts: async (product_id) => {
    try {
      const model = await mongoModel.getRelatedProducts(product_id);
      return model;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve related products in services');
    }
  },
};
