const { MongoClient } = require("mongodb");

const { DB_NAME, DB_URL } = require("./config");

const client = new MongoClient(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

async function connect() {
  try {
    // Connect to the MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    return client.db(DB_NAME);
  } catch (e) {
    console.error(e);
  }
}

module.exports = connect;
