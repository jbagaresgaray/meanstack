/*jshint camelcase: false */

'use strict';

module.exports = function(app, config, ejwt) {

    if (app.get('env') === 'development' || app.get('env') === 'staging') {
        app.use(function(err, req, res, next) {
            /*jshint unused: vars*/
            console.info('DEVELOPMENT / STAGING error: ');
            if (err.name === 'UnauthorizedError') {
                res.status(401).json({
                    response: {
                        result: 'UnauthorizedError',
                        success: false,
                        msg: err.inner
                    },
                    statusCode: 401
                });
            }
        });
    }



    app.use(function(err, req, res, next) {
        /*jshint unused: vars*/
        console.info('PRODUCTION error: ');
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({
                response: {
                    result: 'UnauthorizedError',
                    success: false,
                    msg: err.inner
                },
                statusCode: 401
            });
        }
    });
};
