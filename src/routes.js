const router = require('express').Router();
const controller = require('./controllers');

router.get('/products', controller.products.getProducts);
router.get(
  '/products/:product_id/styles',
  controller.products.getRelatedProducts
);

router.get('/products/:product_id', controller.productInfo.getDetails);
router.get('/products/:product_id/styles', controller.productInfo.getStyles);

module.exports = router;
