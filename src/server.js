require('dotenv').config();
const express = require('express');

const app = express();

// Middleware
const morgan = require('morgan');

app.use(morgan('dev'));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listing on port ${process.env.PORT}`);
});
