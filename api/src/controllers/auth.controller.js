const httpStatus = require('http-status');
const LoginDAO = require('../DAL/LoginDAO');
const UserDAO = require('../DAL/UserDAO');
const { UnauthorizedError } = require('../helpers/errors');
const config = require('../config');

const login = async (req, res, next) => {
    try {
        const { login, password, keep_in_system } = req.body;
        const Login = new LoginDAO(login, password);
        const userId = await Login.getUserId();
        const User = new UserDAO(userId);
        const user = await User.getUser({
            notFoundError: false,
        });
        console.log(user);
        if (!user.confirm_date) {
            throw UnauthorizedError('Confirm your email before login');
        }
        await User.updateUserLastVisit();
        const token = await Login.createToken(keep_in_system);
        res.json({
            data: {
                user,
                token,
            },
        });
    } catch (e) {
        next(e);
    }
};

const logout = async (req, res, next) => {
    try {
        res.sendStatus(httpStatus.OK);
    } catch (e) {
        next(e);
    }
};

const signUp = async (req, res, next) => {
    try {
        await UserDAO.createUser(req.body);
        res.sendStatus(httpStatus.CREATED);
    } catch (e) {
        next(e);
    }
};

const signUpConfirm = async (req, res, next) => {
    try {
        const { t: token } = req.query;
        const { user_id } = await UserDAO.verifyConfirmToken(token);
        const User = new UserDAO();
        await User.activateUser();
        res.redirect(config.confirmRedirectLink);
        res.sendStatus(httpStatus.NON_AUTHORITATIVE_INFORMATION);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    login,
    logout,
    signUp,
    signUpConfirm,
};