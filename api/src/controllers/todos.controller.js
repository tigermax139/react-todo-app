const httpStatus = require('http-status');
const TodoDAO = require('../DAL/TodoDAO');

const create = async (req, res, next) => {
    try {
        await TodoDAO.storeTodo(req.body);
        res.sendStatus(httpStatus.CREATED);
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Todo = new TodoDAO(id);
        await Todo.updateTodo(req.body);
        res.sendStatus(httpStatus.NON_AUTHORITATIVE_INFORMATION);
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Todo = new TodoDAO(id);
        await Todo.removeTodo();
        res.sendStatus(httpStatus.NON_AUTHORITATIVE_INFORMATION);
    } catch (e) {
        next(e);
    }
};

const getSingle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = await TodoDAO.getTodo(id);
        res.json({
            data: todo,
        })
    } catch (e) {
        next(e);
    }
};

const getTodosList = async (req, res, next) => {
    try {
        const { filter, sort, pagination } = req;
        const todos = await TodoDAO.getTodosList({
            pagination,
            sort,
            filter,
        });
        res.json({
            data: {
                todos: todos.rows,
                count: todos.count,
                page: pagination.page,
                per_page: pagination.per_page,
            }
        })
    } catch (e) {
        next(e);
    }
};

module.exports = {
  create,
  update,
  remove,
  getSingle,
  getTodosList,
};