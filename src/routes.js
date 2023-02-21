const router = require('express').Router();
// Import Mongo or PG
const { mongoController } = require('./controllers');

router.get('/products', mongoController.getProducts);
router.get('/products/:product_id', mongoController.getDetails);
router.get('/products/:product_id/styles', mongoController.getStyles);
router.get('/products/:product_id/related', mongoController.getRelatedProducts);

module.exports = router;
