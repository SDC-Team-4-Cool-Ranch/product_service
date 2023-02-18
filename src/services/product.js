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
  getDetails: async (product_id) => {
    try {
      const model = await productModel.getDetails(product_id);
      if (!model.rowCount) return null;

      const { rows } = model;
      const [product] = rows;

      const productDetails = {
        id: product.id,
        name: product.name,
        slogan: product.slogan,
        description: product.description,
        category: product.category,
        default_price: product.default_price,
        features: rows.map((row) => ({
          feature: row.feature,
          value: row.value,
        })),
      };
      return productDetails;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve product details in services');
    }
  },
  getStyles: async (product_id) => {
    try {
      const model = await productModel.getStyles(product_id);
      if (!model.rowCount) return null;
      const { rows } = model;
      const styles = {};

      for (let i = 0; i < rows.length; i += 1) {
        const currRow = rows[i];
        if (!styles[currRow.id]) {
          styles[currRow.id] = {
            ...currRow,
            photos: [],
            skus: {},
          };
        }

        styles[currRow.id].photos.push({
          url: currRow.url,
          thumbnail_url: currRow.thumbnail_url,
        });

        styles[currRow.id].skus[currRow.sku_id] = {
          size: currRow.size,
          quantity: currRow.quantity,
        };
      }

      const result = Object.values(styles);
      const keysToRemove = [
        'url',
        'thumbnail_url',
        'sku_id',
        'quantity',
        'size',
      ];
      result.forEach((style, idx) => {
        const filtered = Object.fromEntries(
          Object.entries(style).filter(([key]) => !keysToRemove.includes(key))
        );
        result[idx] = filtered;
      });
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve styles in services');
    }
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
