const _ = require('lodash');
const config = require('../config');
const sequelize = require('../config/sequelize');
const { Todo } = require('../models');
const { NotFoundError } = require('../helpers/errors');

class TodoDAO {
    constructor(id) {
        this.id = id;
    }
    static async storeTodo (body) {
        const { title, status } = body;
        return await Todo.create({
            title,
            status,
        }, {
            individualHooks: true,
        });
    }
    static async getTodo(value, key = 'id', opt){
        const defaultOptions = {
            notFoundError: true,
        };
        const options = _.merge(defaultOptions, opt);
        const todo = await Todo.findOne({
            where: {
                [key]: value,
            },
            individualHooks: true,
        });
        if (!todo && options.notFoundError) {
            throw NotFoundError();
        }
        return todo;
    }
    static async getTodosList(options) {
        const { pagination, sort, filter } = options;
        console.log('PAG', pagination);
        return await Todo.findAndCountAll({
            where: {},
            // order: [...sort],
            limit: pagination.limit,
            offset: pagination.offset,
        })
    }
    async updateTodo(body) {
        const { title, status } = body;
        const pointer = await TodoDAO.getTodo(this.id);
        return await pointer.update({
            title,
            status,
        }, {
            individualHooks: true,
        })
    }
    async removeTodo () {
        const pointer = await TodoDAO.getTodo(this.id);
        return await pointer.destroy({
            individualHooks: true,
        });
    }
}
module.exports = TodoDAO;