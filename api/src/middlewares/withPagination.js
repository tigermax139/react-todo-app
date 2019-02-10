const config = require('../config');

const { common } = config;

/*
* this function add to req object field pagination with offset
* and limit ( raw params for sequelize query )
* from query or set default
* for pass params through query use: ?page=1&per_page=10,
* */

function withPagination(req, res, next) {
    const { page, per_page: perPage } = req.query;
    const pagination = {
        limit: 10,
        offset: 0,
        page: 1,
        per_page: 10,
    };

    pagination.limit = common.pagination.perPage.default;
    pagination.offset = common.pagination.perPage.default * (common.pagination.page.default - 1);

    if (perPage
        && +perPage >= common.pagination.perPage.min
        && +perPage <= common.pagination.perPage.max
    ) {
        pagination.limit = +perPage;
        pagination.per_page = +perPage;
    }

    if (page
        && +page >= common.pagination.page.min
        && +page <= common.pagination.page.max
    ) {
        pagination.offset = pagination.limit * (+page - 1);
        pagination.page = +page;
    }

    req.pagination = pagination;
    next();
}

module.exports = withPagination;