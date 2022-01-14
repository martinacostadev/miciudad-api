const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()

const config = require('./database/config');

const indexRoutes = require('./routes');

mongoose
  .connect(config.db.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();
    app.use(
      express.urlencoded({
        extended: true,
      })
    );

    app.use(express.json());

    app.use(helmet());
    app.use(morgan('dev'));
    app.use(cors());

    app.use('/v1', indexRoutes);

    app.listen(config.app.port, () => {
      console.log(`Running on port: ${config.app.port}`);
    });
    console.log('DB Connection Successful');
  })
  .catch((error) => {
    console.log(`The connection has failed, ${error}`);
    process.exit(-1);
  });
