require('dotenv').config();
const express = require('express');
const logger = require('./middleware/logger');
const morganMiddleware = require('./middleware/morgan.middleware');

const app = express();

// Middleware
const router = require('./routes');

app.use(express.json());
app.use(morganMiddleware);
app.use('/', router);
app.get('/', (req, res) => {
  res.send('hellloooo');
});

app.listen(process.env.PORT || 8000, () => {
  logger.info(`Listing on port ${process.env.PORT}`);
});
