'use strict';

var env = process.env.NODE_ENV || 'development',
    application = require('./config/application'),
    express = require('express'),
    bunyan = require('bunyan'),
    mongoose = require('mongoose'),
    ejwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    middleware = require('./app/utils/middleware'),
    config = require('./config/environment/' + env),
    Database = require('./app/utils/database').Database,
    db = new Database(mongoose, config),
    log = bunyan.createLogger({
        name: config.app_name
    }),
    app = express();

var router = express.Router({
    strict: true,
    caseSensitive: true
});


process.env.NODE_ENV = env;

require(application.utils + 'helper')(db, app, log);
require(application.utils + 'loadschema')(mongoose);
require(application.config + 'express')(app, passport, config, ejwt);
require(application.config + 'authentication')(app, config, ejwt);
require(application.config + 'passport')(passport, jwt, config);

// Pre populate data
/* Enable to populate the User Schema for the 1st time*/
require(application.data + 'users')(mongoose);

require(application.routes + 'routes')(app, passport, config, middleware);
require(application.routes + '/')(app,passport);

module.exports = app;
