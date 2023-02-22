const router = require('express').Router();
// Import Mongo or PG
const { productController: controller } = require('./controllers');

router.get('/products', controller.getProducts);
router.get('/products/:product_id', controller.getDetails);
router.get('/products/:product_id/styles', controller.getStyles);
router.get('/products/:product_id/related', controller.getRelatedProducts);

module.exports = router;
