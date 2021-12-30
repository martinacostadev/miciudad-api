const dotenv = require('dotenv');

dotenv.config();

const {
  APP_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_URL_DEV,
  DB_URL_PROD,
} = process.env;

const config = {
  app: {
    port: APP_PORT,
  },
  db: {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    name: DB_NAME,
    dev: DB_URL_DEV,
    prod: DB_URL_PROD,
  },
};

module.exports = config;
