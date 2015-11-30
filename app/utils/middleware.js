'use strict';

var isLoggedIn = function(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    } else {
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

};

var isRestLoggedIn = function(err, req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.user) {
        return next();
    } else {
        res.send(401).json({
            response: {
                result: 'UnauthorizedError',
                success: false,
                msg: err.inner
            },
            statusCode: 401
        });
    }

};


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type');
    next();
};

var passKeyToReq = function(apiKey) {
    return function passKeyRequest(req, res, next) {
        req.apiKey = apiKey;
        next();
    };
};


exports.isLoggedIn = isLoggedIn;
exports.allowCrossDomain = allowCrossDomain;
exports.passKeyHandler = passKeyToReq;
exports.isRestLoggedIn = isRestLoggedIn;
