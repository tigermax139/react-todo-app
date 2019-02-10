const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const { Credential } = require('../models');
const { UnauthorizedError } = require('../helpers/errors');

class LoginDAO {
    constructor(login, password) {
        this.login = login;
        this.password = password;
        this.fakePassword = '$2a$10$lxSifSUBBuY3OFheoNStnuidmYLJP6NpDs6mwIWMesuxGCyJ7PQ1i';
        this.user_id = null;
    }
    async getCredential() {
        return await Credential.findOne({
            where: {
                login: this.login,
            }
        });
    }
    async comparePass(hash) {
        return bcrypt.compareSync(this.password, hash);
    }
    async getUserId() {
        const credential = await this.getCredential();
        console.log(credential);
        const isValid = await this.comparePass(credential ? credential.password : this.fakePassword);
        console.log(isValid);
        if (!isValid) {
            throw UnauthorizedError();
        }
        this.user_id = credential.user_id;
        return credential.user_id;
    }
    async createToken(keepInSystem = false) {
        const id = this.user_id || this.getUserId();
        const expiresIn = keepInSystem ? config.jwtExpKeepInSystem : config.jwtExp;
        const token = jwt.sign({
            id,
        }, config.JwtSecret, { expiresIn });
        return token;
    }
}

module.exports = LoginDAO;