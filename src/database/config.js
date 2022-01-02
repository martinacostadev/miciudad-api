const dotenv = require('dotenv');

dotenv.config();

const { PORT, MONGO_URL } = process.env;

const config = {
  db: {
    mongoUrl: MONGO_URL,
  },
  app: {
    port: PORT,
  },
};

module.exports = config;
