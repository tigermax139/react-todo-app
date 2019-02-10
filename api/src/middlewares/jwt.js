const jwt = require('express-jwt');

const config = require('../config');

module.exports = jwt({
    secret: config.JwtSecret,
    credentialsRequired: true,
    getToken: function fromHeaderOrCookies (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.signedCookies && req.req.signedCookies.token) {
            return req.signedCookies.token;
        }
        return null;
    }
}).unless({path: ['/login', '/sing-up', '/sign-up/confirm']});