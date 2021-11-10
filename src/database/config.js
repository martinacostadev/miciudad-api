const config = {
    DB_NAME: "miciudad",
    DB_URL: {
        dev: "mongodb://localhost:27017",
        // TODO: set up correct production url
        prod: "mongodb+srv://user:password@cluster0.7cpxz.mongodb.net/posts?retryWrites=true&w=majority"
    },
};

module.exports = config;