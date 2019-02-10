const subApp = require('express')();

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const todoRoutes = require('./todo.route');

subApp.use('/auth', authRoutes);
subApp.use('/users', userRoutes);
subApp.use('/todos', todoRoutes);

module.exports = subApp;