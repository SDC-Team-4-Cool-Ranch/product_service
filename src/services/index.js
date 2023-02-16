const {
  queryProducts,
  queryDetails,
  queryStyles,
  queryRelatedProducts,
} = require('../models');

module.exports = {
  getProducts: async () => {
    queryProducts();
  },
  getDetails: async () => {
    queryDetails();
  },
  getStyles: async () => {
    queryStyles();
  },
  getRelatedProducts: async () => {
    queryRelatedProducts();
  },
};
