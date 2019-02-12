const jwt = require('express-jwt');
const pathToReg = require('path-to-regexp');
const config = require('../config');

const unprotectedPath = ['/api/auth/login', '/api/auth/sing-up', '/api/auth/sign-up/confirm', '/api/auth/logout'];

    // .map(path => pathToReg(path));
console.log(unprotectedPath);
module.exports = jwtMiddleware = app => {
    const options = {
        secret: config.JwtSecret,
        credentialsRequired: true,
        getToken: function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') return req.headers.authorization.split(' ')[1];
            if (req.query && req.query.token) return req.query.token;

            return null;
        },
    };
    return app.use(jwt(options).unless({path: unprotectedPath}));
};