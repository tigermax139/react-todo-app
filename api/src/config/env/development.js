const path = require('path');

const { PORT } = process.env;

const dbPath = path.join(__dirname, '..', '..', '..', 'todo_app.sqlite');

module.exports = {
    port: PORT || 5000,
    host: 'http://localhost',
    clientUrl: 'http://localhost:3000',
    confirmRedirectLink: '/sign-up/confirm',
    JwtSecret: 'API_JWT_SECRET_KEY',
    cookieSecret: 'API_COOKIE_SECRET_KEY',
    jwtExp: '2h',
    jwtExpKeepInSystem: '1d',
    tokenKey: 'token',
    cookies: {
        domain: '',  // set empty string for localhost
        path: '/',
        httpOnly: true,
        overwrite: true, // overwrite exist cookie with same key, e.g during refresh
        signed: true, // sign by cookiesSecretKey
        secure: false, // only for dev
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
    db: {
        url: 'sqlite://' + dbPath,
        dialect: 'sqlite',
        storage: dbPath,
        logging: msg => console.log('[SEQUELIZE]', msg, '\n'),
        define: {
            underscored: true,
            freezeTableName: false,
            timestamps: true
        },
    }
};