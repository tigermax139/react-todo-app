const Router = require('express').Router();
const validate = require('express-validation');
const rules = require('./validation/todo.validation');
const { paramsId } = require('./validation/common.validation');
const controller = require('../controllers/todos.controller');
const withPagination = require('../middlewares/withPagination');
const withFilterSort = require('../middlewares/withFilterSort');

Router.route('/')
    .get(withPagination, withFilterSort, controller.getTodosList) // list
    .post(validate(rules.create), controller.create); // create
Router.route('/:id')
    .get(validate(paramsId), controller.getSingle) // single
    .put(validate(paramsId), validate(rules.update), controller.update) // update
    .delete(validate(paramsId), controller.remove); // remove

module.exports = Router;