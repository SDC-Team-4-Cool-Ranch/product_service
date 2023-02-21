const router = require('express').Router();
// Import Mongo or PG
const { productController } = require('./controllers');

router.get('/products', productController.getProducts);
router.get('/products/:product_id', productController.getDetails);
router.get('/products/:product_id/styles', productController.getStyles);
router.get(
  '/products/:product_id/related',
  productController.getRelatedProducts
);

module.exports = router;
