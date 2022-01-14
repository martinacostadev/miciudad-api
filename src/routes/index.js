const { Router } = require('express');

const authRoutes = require('./auth.routes');
const userRoutes = require('./users.routes');

const itemsRoutes = require('./items.routes');
const petsRoutes = require('./pets.routes'); 
const personsRoutes = require('./persons.routes');
const categoriesRoutes = require('./categories.routes');

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/items', itemsRoutes);
routes.use('/users', userRoutes);
routes.use('/pets', petsRoutes);
routes.use('/persons', personsRoutes);
routes.use('/categories', categoriesRoutes);


module.exports = routes;
