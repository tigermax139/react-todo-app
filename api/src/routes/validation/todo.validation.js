const Joi = require('joi');

const create = {
    body: {
        title: Joi.string().required(),
        status: Joi.allow(['scheduled', 'in progress', 'done']),
    }
};

const update = {
    ...create,
};

module.exports = {
    create,
    update,
};