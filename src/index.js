require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8080;

app.use(cors());

app.listen(port, () => {
    console.log(`Runing on port: ${port}`);
})

module.export = app;