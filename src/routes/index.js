const { Router } = require('express');

const extraviosRoute = require('./extraviosRoute');

const routes = Router();

routes.use('/extravios', extraviosRoute);

module.exports = routes;
