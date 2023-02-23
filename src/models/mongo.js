require('../database/mongo/mongo');
const { Product, Style, Related } = require('../database/mongo/mongooseSchema');
const logger = require('../middleware/logger');

module.exports = {
  getProducts: async (page = 1, count = 10) => {
    const skip = count * (page - 1);
    try {
      const result = await Product.find().skip(skip).limit(count).exec();
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve products in models');
    }
  },
  getDetails: async (product_id) => {
    try {
      const result = await Product.find({ id: product_id }).exec();
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve product detail in models');
    }
  },
  getStyles: async (product_id) => {
    try {
      const result = await Style.find({ product_id }).exec();
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve styles in models');
    }
  },
  getRelatedProducts: async (product_id) => {
    try {
      const result = await Related.find({
        product_id,
      }).exec();
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve related products in models');
    }
  },
};
