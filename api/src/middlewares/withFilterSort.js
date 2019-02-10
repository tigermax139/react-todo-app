const config = require('../config');

const { common } = config;

/*
* this function add to req object field filter and sort
* for pass params through query use: ?status=done&sort=[id, desc],
* */

function withFilterSort (req, res, next) {
    next();
}

module.exports = withFilterSort;