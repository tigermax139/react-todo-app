const Joi = require('joi');

const create = {
    body: {
        title: Joi.string().requried(),
        status: Joi.string().optional(),
    }
};

const update = {
    ...create,
};

module.exports = {
    create,
    update,
};