const UserDAO = require('../DAL/UserDAO');
const { ForbiddenError, UnauthorizedError } = require('../helpers/errors');

const getSingleUser = async (req, res, next) => {
    try {
        let id = null;
        const { id: paramsId } = req.params;
        const { id: userId } = req.user;
        if (paramsId && paramsId !== userId) {
            throw ForbiddenError();
        }
        if (!paramsId && userId) {
            id = userId;
        } else {
            throw UnauthorizedError();
        }
        const user = await UserDAO.getUserBy(id);
        res.json({
            data: {user},
        })
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getSingleUser,
};