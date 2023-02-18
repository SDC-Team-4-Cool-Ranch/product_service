const fs = require('fs');
const { Pool } = require('pg');
const path = require('path');
const csv = require('csv-parser');
const logger = require('../../middleware/logger');
const mapping = require('./dataTypes');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'testing',
  user: 'me',
  password: 'password',
});

const csvDirectory = path.join(__dirname, '..', 'csv');
const csvFiles = [
  'product.csv',
  'styles.csv',
  'features.csv',
  'skus.csv',
  'photos.csv',
  'related.csv',
  'cart.csv',
];

const createTable = async (file) => {
  const tableName = mapping.tableNames[file];
  const types = mapping.dataTypes[tableName];
  // Keeping it non string query just for need to refactor to headers to be more dynamic
  const insertTypes = Object.entries(types)
    .map(([prop, val]) => {
      if (prop === 'foreign_key') {
        return val.join(', ');
      }
      return `${prop} ${val}`;
    })
    .join(', ');

  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${insertTypes})`;

  try {
    await pool.query(createTableQuery);
    logger.info(`Table ${tableName} created successfully.`);
  } catch (err) {
    logger.error(err);
  }
};

const parserETL = async (file) => {
  const csvPath = path.join(csvDirectory, file);
  const tableName = mapping.tableNames[file];
  const output = [];
  const stream = fs.createReadStream(csvPath);

  stream.pipe(csv({ quote: '"' })).on('data', (row) => {});
};

const processAll = async () => {
  const [productParent, styleParent, ...childTables] = csvFiles;
  // await createTable(productParent);
  parserETL(productParent);
  // await createTable(styleParent);
  // // Not sure why it's asynchronous when all are in promises
  // const creationPromises = childTables.map((file) => createTable(file));
  // await Promise.all(creationPromises);
};

processAll();
