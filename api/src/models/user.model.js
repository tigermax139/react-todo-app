'use strict';
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        'user',
        {
            first_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            last_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                }
            },
            image_url: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            last_visit: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            confirm_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
        },
        {
            individualHooks: true,
            defaultScope: {
                attributes: [
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'image_url',
                    'last_visit',
                    'confirm_date',
                ],
            },
        }
    );
    User.associate = function(models) {};
    return User;
};