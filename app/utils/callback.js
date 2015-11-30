'use strict';

exports.setupResponseCallback = function (res) {

    return function (error, returnValue) {
        if (error) {
            return res.status(500).json({msg: error, statusCode: 500});
        }

        res.status(200).json({result: returnValue, statusCode: 200});
    };
};

exports.handleError = function (err, res, next) {
    if(err){
        res.status(500).end();
    }else{
        next();
    }
};

exports.requestErrorHandler = function(callback) {
    return function (err, resp) {
        if(err) {
            console.log('Error', err);
            return callback(err, {});
        }
        console.log('Response from API ----- ', resp.body);
        return callback(null, resp.body);
    };
};

