const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const { hashPassword } = require('./hooks/credential.hook');
const { setUserToOptions, setUserToEntity } = require('./hooks/todo.hook');
const { sendEmail, beforeActivate } = require('./hooks/user.hook');

// import all models
const Todo = require('./todo.model')(sequelize, Sequelize);
const User = require('./user.model')(sequelize, Sequelize);
const Credential = require('./credential.model')(sequelize, Sequelize);

Todo.belongsTo(User, { foreignKey: 'user_id' });
Credential.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Credential, { foreignKey: 'user_id' });
User.hasMany(Todo, { foreignKey: 'user_id' });

User.addHook('afterCreate', 'sendEmail', sendEmail);
User.addHook('beforeUpdate', 'checkConfirmDate', beforeActivate);

Credential.addHook('beforeCreate', 'hashingPasswordCreate', hashPassword);

Todo.addHook('beforeValidate', 'setUserCreate', setUserToEntity);
Todo.addHook('beforeFind', 'setUserFind', setUserToOptions);
Todo.addHook('beforeCount', 'setUserCount', setUserToOptions);

sequelize.sync().then(
    () => {
        console.info('Sequelize sync success');
},
    (e) => {
        console.info('Sequelize sync failure');
        console.error(e);
});

module.exports = {
    User,
    Credential,
    Todo,
};

// // show associations to console
// console.log("\nAssociations");
// const entity = User;
// for (let assoc of Object.keys(entity.associations)) {
//   for (let accessor of Object.keys(entity.associations[assoc].accessors)) {
//     console.log(entity.name + '.' + entity.associations[assoc].accessors[accessor]+'()');
//   }
// }