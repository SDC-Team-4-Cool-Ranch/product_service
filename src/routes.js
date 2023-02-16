const router = require('express').Router();
const {
  getProducts,
  getDetails,
  getStyles,
  getRelatedProducts,
} = require('./controllers');

router.get('/products', getProducts);
router.get('/products/:product_id', getDetails);
router.get('/products/:product_id/styles', getStyles);
router.get('/products/:product_id/styles', getRelatedProducts);

module.exports = router;
