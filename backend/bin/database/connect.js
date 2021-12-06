// load configurations
require('dotenv').config();

const mysql = require('mysql2');
const logger = require('../logger/winston');

const CONFIG = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
};

const connection = mysql.createConnection({
  host: CONFIG.DB_HOST,
  user: CONFIG.DB_USER,
  password: CONFIG.DB_PASS,
  database: CONFIG.DB_NAME,
});

connection
  .promise()
  .query('SELECT 1')
  .then(([rows, fields]) => {
    logger.info(`[database] connected to ${CONFIG.DB_NAME}`);
  })
  .catch(() => {
    logger.error(`[database] failed to connect to ${CONFIG.DB_NAME}`);
  })


module.exports = connection;
