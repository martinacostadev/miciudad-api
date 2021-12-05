const { Router } = require('express');

const lostItemsRoutes = require('./lostItemsRoutes');

const routes = Router();

routes.use('/v1/extravios', lostItemsRoutes);

module.exports = routes;
