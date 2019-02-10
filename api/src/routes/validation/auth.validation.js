const Joi = require('joi');

const login = {
   body: {
       login: Joi.string().required(),
       password: Joi.string().required(),
       keep_in_system: Joi.boolean().optional(),
   }
};

const confirm = {
    query: {
        t: Joi.string().required(),
    }
};

module.exports = {
    login,
    confirm
};