const Router = require('express').Router();
const validate = require('express-validation');
const rules = require('./validation/auth.validation');
const userRules = require('./validation/user.validation');

const controller = require('../controllers/auth.controller');

Router.route('/login')
    .post(validate(rules.login), controller.login);

Router.route('/logout')
    .get(controller.logout);

Router.route('/sign-up')
    .post(validate(userRules.create), controller.signUp);

Router.route('/sign-up/confirm')
    .get(validate(rules.confirm), controller.signUpConfirm);

module.exports = Router;