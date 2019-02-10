const Sequelize = require('sequelize');

const config = require('./index');


const sequelize = new Sequelize(
    config.db.url,
    {
        ...config.db,
        operatorsAliases: Sequelize.Op,
    },

);

module.exports = sequelize;