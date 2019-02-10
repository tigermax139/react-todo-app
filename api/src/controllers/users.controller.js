const UserDAO = require('../DAL/UserDAO');

const getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserDAO.getUserBy(id);
        res.json({
            data: user,
        })
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getSingleUser,
};