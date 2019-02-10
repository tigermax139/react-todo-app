const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../config');
const sequelize = require('../config/sequelize');
const { User } = require('../models');
const { NotFoundError, AlreadyExist, UnauthorizedError } = require('../helpers/errors');

class UserDAO {
    constructor(id){
        this.id = id;
    }
    static async createUser(body){
        const { first_name, last_name, image_url, email, password, confirm_date } = body;
        await UserDAO.getUserBy(email, 'email', {
            notFoundError: false,
            alreadyExistError: true,
        });
        const credential = {
            login: email,
            password,
        };
        return await sequelize.transaction(async transaction => {
            const user = await User.create({
                first_name,
                last_name,
                email,
                image_url,
                confirm_date,
            }, {
                individualHooks: true,
                transaction
            }
            );
            await user.createCredential(credential, {
                individualHooks: true,
                transaction,
            });
            return user;
        });
    }
    static async getUserBy(value, key = 'id', opt) {
        const defaultOptions = {
            notFoundError: true,
            alreadyExistError: false,
        };
        const options = _.merge(defaultOptions, opt);
        const user = await User.findOne({
            where: {
                [key]: value,
            }
        });
        if (!user && options.notFoundError) {
            throw NotFoundError();
        }
        if (user && options.alreadyExistError) {
            throw AlreadyExist();
        }
        return user;
    }
    static async verifyConfirmToken(token) {
        try {
            return jwt.verify(token, config.JwtSecret);
        }catch (e) {
            if (e instanceof jwt.TokenExpiredError || e instanceof jwt.JsonWebTokenError) {
                throw UnauthorizedError("Link expired");
            }
            return e;
        }
    }
    async getUser(options) {
        return await UserDAO.getUserBy(this.id, 'id', options);
    }
    async updateUser(body, options){
        const pointer = await this.getUser(options);
        return await pointer.update(body, {
            individualHooks: true
        });
    }
    async updateUserLastVisit() {
        return await this.updateUser({
            last_visit: new Date(),
        });
    }
    async activateUser() {
        return await this.updateUser({
            confirm_date: new Date(),
        });
    }
}

module.exports = UserDAO;