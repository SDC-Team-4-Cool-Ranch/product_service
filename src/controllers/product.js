const { productService } = require('../services');
const logger = require('../middleware/logger');
const setCache = require('../lib/redisCache');

module.exports = {
  getProducts: async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const count = req.query.count ? parseInt(req.query.count, 10) : 10;
    if (page < 0 || count < 0 || count > 1000) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    try {
      const products = await productService.getProducts({ page, count });

      await setCache(req.path, products);
      return res.status(200).send(products);
    } catch (err) {
      logger.error(err);
      return res.status(500).send({ error: 'Failed fetching products' });
    }
  },
  getDetails: async (req, res) => {
    try {
      const { product_id } = req.params;
      const productDetails = await productService.getDetails(product_id);

      await setCache(req.path, productDetails);
      return res.status(200).send(productDetails);
    } catch (err) {
      logger.error(err);
      return res.status(500).send({ error: 'Failed fetching product details' });
    }
  },
  getStyles: async (req, res) => {
    try {
      const { product_id } = req.params;
      const styles = await productService.getStyles(product_id);

      await setCache(req.path, styles);
      return res.status(200).send(styles);
    } catch (err) {
      logger.error(err);
      return res.status(500).send({ error: 'Failed fetching styles' });
    }
  },
  getRelatedProducts: async (req, res) => {
    const { product_id } = req.params;
    try {
      const relatedProducts = await productService.getRelatedProducts(
        product_id
      );

      await setCache(req.path, relatedProducts);
      return res.status(200).send(relatedProducts);
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .send({ error: 'Failed fetching related products' });
    }
  },
};
