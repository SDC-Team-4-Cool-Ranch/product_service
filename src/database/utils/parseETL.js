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
  const readStream = fs.createReadStream(csvPath);
  const writeStream = fs.createWriteStream(
    path.join(csvDirectory, `clean${file}`)
  );

  readStream
    .pipe(csv({ headers: true, quote: "'" }))
    .on('headers', (headers) => {
      const row = headers.join(',');
      writeStream.write(`${row}\n`);
    })
    .on('data', (data) => {
      const row = Object.values(data).join(',');
      return writeStream.write(`${row}\n`);
    })
    .on('end', async () => {
      const tableName = mapping.tableNames[file];
      try {
        const copyQuery = `COPY ${tableName} FROM '${csvDirectory}/clean${file}' WITH (FORMAT csv, HEADER true, NULL 'null')`;
        await pool.query(copyQuery, [], (err, res) => {
          if (err) {
            logger.error(err);
          } else logger.info(res);
        });
      } catch (err) {
        logger.error(err);
      }
    })
    .on('error', (err) => {
      logger.error(err);
    });
};

const writePhotos = () => {
  const photoPath = path.join(csvDirectory, 'photos.csv');
  const readStream = fs.createReadStream(photoPath);
  const writeStream = fs.createWriteStream(
    path.join(csvDirectory, 'cleanphotos.csv')
  );
  writeStream.write('id,style_id,url,thumbnail_url\n');
  readStream.pipe(csv({ quote: "'" })).on('data', async (chunk) => {
    const copy = { ...chunk };
    copy.id = copy.id.replaceAll(/\D/g, '');
    copy.styleId = copy.styleId.replaceAll(/\D/g, '');
    copy.url = copy.url.replaceAll(/"|\\/g, '');
    copy.thumbnail_url = copy.thumbnail_url.replaceAll(/"|\\/g, '');
    copy.url = `"${copy.url}"`;
    copy.thumbnail_url = `"${copy.thumbnail_url}"`;
    writeStream.write(
      `${copy.id},${copy.styleId},${copy.url},${copy.thumbnail_url}\n`
    );
  });
};

const processAll = async () => {
  const [productParent, styleParent, ...childTables] = csvFiles;
  await createTable(productParent);
  await createTable(styleParent);
  // Not sure why it's asynchronous when all are in promises
  const creationPromises = childTables.map((file) => createTable(file));
  await Promise.all(creationPromises);
  // Too lazy to do a loop, just insert file name here to copy
  parserETL('product.csv');
  // For photos
  writePhotos();
};

processAll();
