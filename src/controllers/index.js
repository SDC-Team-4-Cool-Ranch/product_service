const {
  getProducts,
  getDetails,
  getStyles,
  getRelatedProducts,
} = require('../services');

module.exports = {
  getProducts: async (req, res) => {
    getProducts();
  },
  getDetails: async (req, res) => {
    getDetails();
  },
  getStyles: async (req, res) => {
    getStyles();
  },
  getRelatedProducts: async (req, res) => {
    getRelatedProducts();
  },
};
