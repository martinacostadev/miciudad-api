const { MongoClient } = require('mongodb');

const config = require('./config');

const mongoUrl =
  process.env.NODE_ENV === 'production' ? config.db.prod : config.db.dev;

const client = new MongoClient(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

async function connect() {
  try {
    // Connect to the MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(config.db.name);
    return db;
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = connect;
