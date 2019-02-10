const Router = require('express').Router();
const validate = require('express-validation');
const { paramsId } = require('./validation/common.validation');
const controller = require('../controllers/users.controller');

Router.route('/:id')
    .get(validate(paramsId), controller.getSingleUser); // single info

module.exports = Router;