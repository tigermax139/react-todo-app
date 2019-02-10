const config = require('../config');

const { tokenKey, cookies: cookiesConfig } = config;

const setRefreshTokenCookie = (res, data) => {
    res.cookie(tokenKey, data, {
        ...cookiesConfig,
    });
};

module.exports = {
    setRefreshTokenCookie,
};