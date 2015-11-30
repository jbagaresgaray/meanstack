'use strict';

var express = require('express');
var router = express.Router({
    strict: true,
    caseSensitive: true
});

var env = process.env.NODE_ENV;
var config = require('../../config/environment/' + env);

router.all('/home/*', function(req, res) {
	if (req.isAuthenticated()) {
        res.render('home');
    } else {
        res.redirect('/login');
    }
});

router.all(config.api_version + '/api/1.0/*', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(401).json({});
    } else {
        next();
    }
    //next();
});

exports.router = router;
