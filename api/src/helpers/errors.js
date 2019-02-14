const httpStatus = require('http-status');
const APIError = require('./ApiError');

const NotFoundError = (msg = 'NOT FOUND') => new APIError(msg, httpStatus.NOT_FOUND, true);

const UnauthorizedError = (msg = 'UNAUTHORIZED') => new APIError(msg, httpStatus.UNAUTHORIZED, true);

const ForbiddenError = (msg = 'FORBIDDEN') => new APIError(msg, httpStatus.FORBIDDEN, true);

const AlreadyExist = (msg = 'ALREADY EXIST') => new APIError(msg, httpStatus.UNPROCESSABLE_ENTITY, true);

module.exports = {
    NotFoundError,
    UnauthorizedError,
    AlreadyExist,
};