const Joi = require('joi');

const paramsId = {
    params: {
        id: Joi.number().min(1).max(Number.MAX_SAFE_INTEGER).required()
    }
};

module.exports = {
    paramsId,
};