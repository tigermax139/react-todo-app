const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const cls = require('continuation-local-storage');
const Sequelize = require('sequelize');
const jwt = require('express-jwt');

const config = require('./index');
const binUserToContext = require('../middlewares/bindUserToContext');
const routes = require('../routes');
const APIError = require('../helpers/ApiError');

const app = express();
// init CLS
const namespace = cls.createNamespace(config.common.cls.namespace);
Sequelize.useCLS(namespace);

const logger = morgan('combined', {
    stream: fs.createWriteStream(path.resolve(__dirname, '..', '..', 'access.log'), {
        flags: 'a',
    })
});

app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(cookieParser(config.cookieSecret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use(
    jwt({
        secret: config.JwtSecret,
        credentialsRequired: true,
    }).unless({path: ['/api/auth/login', '/api/auth/sing-up', '/api/auth/sign-up/confirm']})
);
app.use(binUserToContext);
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
        const error = new APIError(unifiedErrorMessage, err.status, true);
        return next(error);
    }
    if (!err.isPublic && !(err instanceof APIError)) {
        console.error(err);
    }
    if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, err.isPublic);
        return next(apiError);
    }
    return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new APIError('API not found', httpStatus.NOT_FOUND);
    return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
    res.status(err.status).json({ // eslint-disable-line
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: config.env === 'development' ? err.stack : {},
        data: null,
    }));


module.exports = app;