const fs = require('fs');
const path = require('path');
const http = require('http');

const config = require('../config');
const app = require('../config/express');
const sequelize = require('../config/sequelize');

const {env, port} = config;
const isDev = env === 'development';
const server = http.createServer(app);

app.set('port', port);
app.set('env', env);
app.set('isDev', isDev);

server.on('error', onError); // eslint-disable-line
server.on('listening', onListening); // eslint-disable-line

// info about API
const packageInfo = fs.readFileSync(path.resolve(__dirname, '..', '..', 'package.json'));
const { name, version, description } = JSON.parse(packageInfo);
console.info('------------------');
console.info('NAME: ', name);
console.info('VER : ', version);
console.info('DESC: ', description);
console.info('------------------');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connect success');
    } catch (e) {
        console.error('Sequelize auth error', e.message);
        process.exit(1);
    }
    try {
        await server.listen(port);
        console.log(`Server start on port: ${port}`);
    } catch (e) {
        console.error('Server listen error', e.message);
        process.exit(1);
    }
})();


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function normalizePort(val) { // eslint-disable-line
    const port = parseInt(val, 10); // eslint-disable-line
    if (isNaN(port)) return val;  // eslint-disable-line
    if (port >= 0) return port;
    console.error('Invalid PORT parameter');
    process.exit(1);
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`; // eslint-disable-line
}

