require('dotenv').config();
const express = require('express');
const logger = require('./middleware/logger');

const app = express();

// Middleware
// const router = require('./routes');

app.use(express.json());
// app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
  logger.info(`Listing on port ${process.env.PORT}`);
});
