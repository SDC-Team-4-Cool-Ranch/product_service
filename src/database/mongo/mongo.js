const mongoose = require('mongoose');
const logger = require('../../middleware/logger');

mongoose.connect('mongodb://localhost/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', logger.error.bind(console, 'Connection error'));
db.on('open', () => {
  logger.info('CONNECTED TO MONGO');
});

module.exports = db;
