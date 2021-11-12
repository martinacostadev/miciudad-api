const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

const env = process.env.NODE_ENV;

const envFile = env ? `.env.${env}` : ".env";
dotenv.config({ path: envFile });

const port = process.env.PORT || 8080;

app.use(cors());

app.listen(port, () => {
  console.log(`Runing on port: ${port}`);
});

module.export = app;
