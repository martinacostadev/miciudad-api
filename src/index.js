const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
require('dotenv').config()

const lostItemsRouter = require('./routes/lostItemsRoutes');

// BODY PARSER, READING DATA FROM BODY INTO req.body
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Middlewares
app.use(morgan('dev'));
app.use(helmet());

app.use(cors());

// Routes
app.use('/api/v1/extravios', lostItemsRouter);

const DB = process.env.DB_NAME.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);

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
