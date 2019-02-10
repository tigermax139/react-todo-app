const Joi = require('joi');

const create = {
  body: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
  }
};

module.exports = {
    create,
};