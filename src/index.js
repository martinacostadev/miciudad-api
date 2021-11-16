const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const lostItemsRouter = require('./routes/lostItemsRoutes');
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8080;

// BODY PARSER, READING DATA FROM BODY INTO req.body
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));


app.use('/api/v1/extravios', lostItemsRouter);


const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

app.use(cors());

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
    process.exit(-1);
  });

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

module.export = app;
