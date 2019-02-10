const development = require('./env/development');
const common = require('./env/common');

const currentEnv = process.env.NODE_ENV || 'development';

const config = {
    development,
    production: {
        ...development,
    },
};


console.log('Setted env  :', process.env.NODE_ENV);
console.log('Current env :', currentEnv);

module.exports = {
    ...config[currentEnv],
    env: currentEnv,
    common,
};


