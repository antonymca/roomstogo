'use strict'

const { createLogger, format, transports } = require('winston');
const winston = require('winston');
const { combine, timestamp, label, printf } = format;
const httpContext = require('express-http-context');
const appRoot = require('app-root-path');
require('winston-daily-rotate-file');
const env = process.env.NODE_ENV || 'development';

const dailyRotateFileTransportApp = new transports.DailyRotateFile({
    filename: `${appRoot}/logs/app.log`,
    datePattern: 'YYYY-MM-DD'
});

const myFormat = printf(info => {
    return `${httpContext.get('transactionId')} ${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});


const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 10485760, 
        maxFiles: 5,
        format: combine(
            format.colorize(),
            label({ label: 'roomstogo' }),
            timestamp(),
            myFormat
        )
    },
    console: {
        format: combine(
            format.colorize(),
            label({ label: 'roomstogo' }),
            myFormat
        ),
        transports: [new transports.Console()]
    },
    error: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 10485760, // 10MB
        maxFiles: 5,
        colorize: true,
        format: combine(
            format.colorize(),
            label({ label: 'roomstogo' }),
            timestamp(),
            myFormat
        )
    }
};

winston.addColors({
    info: 'blue',
    error: 'red',
    warn: 'yellow'
});

const logger = createLogger({
    transports: [
        new transports.File(options.file),
        new transports.File(options.error),

        dailyRotateFileTransportApp,

    ],
    exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'production') {
    try {
        logger.add(new transports.Console({
            format: format.simple()
        }));
    } catch (e) {
        console.log(e)
    }
}

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};



module.exports = logger;