const bcrypt = require('bcryptjs');

const hashPassword = credential => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(credential.password, salt);
    credential.password = hash;
};

module.exports = {
    hashPassword,
};