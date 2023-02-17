const fs = require('fs');
const { Pool } = require('pg');
const path = require('path');
const csv = require('csv-parser');
const logger = require('../../middleware/logger');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'testing',
  user: 'me',
  password: 'password',
});

const csvDirectory = path.join(__dirname, '..', 'csv');
const csvFiles = ['test1.csv', 'test2.csv'];

csvFiles.forEach((file) => {
  const csvPath = path.join(csvDirectory, file);

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('headers', (headers) => {
      const types = {};

      // DO TYPE CHECK HERE
      headers.forEach((col) => {
        types[col] = 'INTEGER';
      });

      const createTableQuery = `CREATE TABLE IF NOT EXISTS ${
        file.split('.')[0]
      } (${headers.map((col) => `${col} ${types[col]}`).join(', ')})`;

      pool.query(createTableQuery, (err) => {
        if (err) {
          logger.error(err);
        } else {
          logger.info(`Table ${file.split('.')[0]} created successfully.`);
        }
      });
    })
    .on('data', (row) => {
      const columns = Object.keys(row);
      const values = columns.map((col) => row[col]);
      const placeholders = columns
        .map((col, index) => `$${index + 1}`)
        .join(', ');
      const insertQuery = `INSERT INTO ${file.split('.')[0]} (${columns.join(
        ', '
      )}) VALUES (${placeholders})`;

      pool.query(insertQuery, values, (err) => {
        if (err) {
          logger.error(err);
        } else {
          logger.info(`Row inserted into ${file.split('.')[0]} successfully.`);
        }
      });
    })
    .on('end', () => {
      logger.info(`CSV file ${file} successfully processed.`);
    });
});
