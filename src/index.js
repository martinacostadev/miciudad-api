const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const config = require('./database/config');

const indexRoutes = require('./routes');

const DB = config.db.name.replace('<PASSWORD>', config.db.password);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();
    app.use(
      express.urlencoded({
        extended: true,
      }),
    );

    app.use(express.json());

    app.use(helmet());
    app.use(morgan('dev'));
    app.use(cors());

    app.use('/api/v1', indexRoutes);

    app.listen(config.app.port, () => {
      console.log(`Running on port: ${config.app.port}`);
    });
    console.log('DB Connection Successful');
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
    process.exit(-1);
  });
