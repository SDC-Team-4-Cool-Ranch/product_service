const {
  getProducts,
  getDetails,
  getStyles,
  getRelatedProducts,
} = require('../services');
const logger = require('../middleware/logger');

module.exports = {
  getProducts: async (req, res) => {
    try {
      await getProducts();
    } catch (err) {
      logger.error(err);
    }
  },
  getDetails: async (req, res) => {
    try {
      await getDetails();
    } catch (err) {
      logger.error(err);
    }
  },
  getStyles: async (req, res) => {
    try {
      await getStyles();
    } catch (err) {
      logger.error(err);
    }
  },
  getRelatedProducts: async (req, res) => {
    try {
      await getRelatedProducts();
    } catch (err) {
      logger.error(err);
    }
  },
};
