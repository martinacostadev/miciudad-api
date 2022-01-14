const { Router } = require('express');

const extraviosRoute = require('./extraviosRoute');
const lostTypeRoutes = require('./lostTypeRoutes');

const routes = Router();

routes.use('/extravios', extraviosRoute);
routes.use('/lost_type', lostTypeRoutes);

module.exports = routes;
