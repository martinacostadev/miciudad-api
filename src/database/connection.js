const { MongoClient } = require("mongodb")

const config = require("./config")
const mongoUrl = 
    process.env.NODE_ENV === "production" 
        ? config.DB_URL.prod 
        : config.DB_URL.dev

const client = new MongoClient(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

async function connect() {
    try {
        // Connect to the MongoDB
        await client.connect();
        console.log("Connected to MongoDB")

        const db = client.db(config.DB_NAME)
        return db
    } catch (e) {
        console.error(e);
    }
}

module.exports = connect;