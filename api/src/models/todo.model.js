'use strict';
module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define(
        'todo',
        {
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: 'scheduled',
                // validate: {
                //     isIn: ['scheduled', 'in progress', 'done']
                // }
                allowNull: true,
            }
        },
    );
    Todo.associate = function(models) {};
    return Todo;
};