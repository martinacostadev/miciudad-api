require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const lostItems = require('./routes/lostItems');

// Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Routes
app.use(lostItems);

app.listen(port, () => {
    console.log(`Listening at port ${ port }`);
});
