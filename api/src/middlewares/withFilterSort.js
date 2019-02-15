const _ = require('lodash');
const config = require('../config');

const { common } = config;

/*
* this function add to req object field filter and sort
* for pass params through query use: ?status=done&sort=[id, desc],
* */

function withFilterSort (req, res, next) {
    const { sort } = req.query;
    console.log('SORT', sort);
    if (!sort) {
        req.sort = [['created_at', 'DESC']];
        return next();
    }
    if (_.isArray(sort)) {
        const order = sort.map(sortItem => {
            const splitedItem = sortItem.split(',');
            return [splitedItem[0], splitedItem[1] === 'descend' ? 'DESC' : 'ASC'];
        });
        console.log(order);
        req.sort = order;
    } else {
        const splitedItem = sort.split(',');
        const order = [[splitedItem[0], splitedItem[1] === 'descend' ? 'DESC' : 'ASC']];
        console.log(order);
        req.sort = order;
    }

    next();
}

module.exports = withFilterSort;