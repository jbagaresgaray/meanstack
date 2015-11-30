'use strict';

var cb = require('./../utils/callback');
var userdaos = require('../daos/userdaos');

var usersservices = require('../services/usersservices').Users;
var users = new usersservices();



exports.getAllUsers = function(req, res) {
    users.getAllUsers(cb.setupResponseCallback(res));
};

exports.getUserById = function(req, res) {
    users.getUserById(req.params.id, cb.setupResponseCallback(res));
}

exports.createUser = function(req, res) {
    users.createUser(req.body, cb.setupResponseCallback(res));
};

exports.updateUser = function(req, res) {
    users.updateUser(req.params.id, req.body, cb.setupResponseCallback(res));
};

exports.deleteUser = function(req, res) {
    console.log('ID: ', req.params.id);
    users.deleteUser(req.params.id, cb.setupResponseCallback(res));
};

exports.authUser = function(passport) {
    return passport.authenticate('user_default', {
        successRedirect: '/home',
        failureRedirect: '/invalid'
    });
};


exports.updateLogDate = function(req, res) {
    var data = {};
    var DateNow = new Date(Date.now());
    data.log_inDate = DateNow.toISOString();
    if (req.user) {
        var user = req.user;
        console.log('user: '. user);
        userdaos.findOneUserAndUpdate({
            _id: user.result._id
        }, data, function(err, data) {
            if (err) {
                res.status(500).json({
                    response: err,
                    statusCode: 500
                });
            }
            res.status(200).json({
                response: req.user,
                statusCode:200
            });
        });
    } else {
        res.send('0');
    }
};

exports.logout = function(req, res) {
    req.logout();
    res.status(200).json({
        msg: 'User successfully logout',
        success: true,
        result: null,
        statusCode: 200
    }).end();
};
