const mysql = require('mysql2');
require('dotenv').config();

const config = require('../config/config.json');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DBNAME,
  password: process.env.DB_PASSWORD,
});

module.exports = pool.promise();
