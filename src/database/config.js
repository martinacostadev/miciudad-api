const config = {
  DB_NAME: process.env.DB_NAME,
  DB_URL: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`,
};

module.exports = config;
