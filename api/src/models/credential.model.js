'use strict';

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        'credentials',
        {
            user_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            login: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
    );
    User.associate = function(models) {};
    return User;
};