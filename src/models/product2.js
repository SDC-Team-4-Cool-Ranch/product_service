const db = require('../database/mongo/mongo');
const logger = require('../middleware/logger');

module.exports = {
  getProducts: async (page = 1, count = 10) => {
    console.log(page, count);
  },
  getDetails: async (product_id) => {},
  getStyles: async (product_id) => {},
  getRelatedProducts: async (product_id) => {},
};
