const {
  productsModel,
  detailsModel,
  stylesModel,
  relatedModel,
} = require('../models');

module.exports = {
  getProducts: async () => {
    productsModel();
  },
  getDetails: async () => {
    detailsModel();
  },
  getStyles: async () => {
    stylesModel();
  },
  getRelatedProducts: async () => {
    relatedModel();
  },
};
