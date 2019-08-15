const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require("./utils/logger");
const httpContext = require('express-http-context');

const app = express();
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.json({ limit: '10000mb' }));
app.use(express.json());
app.use(httpContext.middleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
require("../globalRoutes.js")(app, logger);


app.use( (err, req, res, next) =>{
    console.log("entered error state");
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next();
});

module.exports = app;
