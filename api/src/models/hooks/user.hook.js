const jwt = require('jsonwebtoken');

const config = require('../../config');
const { confirmationMail } = require('../../services/mailer');
const { AlreadyExist } = require('../../helpers/errors');

const sendEmail = user => {
    if (!user.confirm_date) {
        const token = jwt.sign({
            user_id: user.id,
        }, config.JwtSecret, { expiresIn: '30d' });
        confirmationMail(user.email, token);
    }
};

const beforeActivate = (user, options) => {
    if (options.fields.includes('confirm_date') && user.confirm_date) {
        throw AlreadyExist('Email is already confirmed');
    }
};

module.exports = {
    sendEmail,
    beforeActivate,
};