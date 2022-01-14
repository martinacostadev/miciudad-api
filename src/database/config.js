const dotenv = require('dotenv');

dotenv.config();

const { PORT, MONGO_URL, SECRETOPRIVATEKEY} = process.env;

const config = {
  db: {
    mongoUrl: MONGO_URL,
  },
  app: {
    port: PORT,
  },
  jwt: {
    key: SECRETOPRIVATEKEY,
  }
};

module.exports = config;
