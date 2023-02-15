const router = require('express').Router();
const pool = require('../database/index');

router.get('/', (req, res) => {
  // testing db connection
  pool.connect((err, client) => {
    client.query('SELECT * FROM accounts');
  });
});

module.exports = router;
