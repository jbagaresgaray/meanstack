'use strict';

var userCtrl = require('../controllers/userscontroller');
var ensure = require('connect-ensure-login');

module.exports = function(app, passport) {

    app.route('/login')
        .get(function(req, res) {
            if (req.isAuthenticated()) {
                res.redirect('/home');
            } else {
                res.render('login');
            }
        })
        .post(userCtrl.authUser(passport));

    app.route('/home')
        .get(ensure.ensureLoggedIn('/login'), function(req, res) {
            console.log('user: ', req.user);
            res.render('home');
        });

    app.route('/')
        .get(ensure.ensureLoggedIn('/login'), function(req, res) {
            res.redirect('/home');
        });

    app.route('/invalid')
        .get(ensure.ensureLoggedIn('/login'), function(req, res) {
            res.render('invalid');
        });

    app.route('/logout')
        .post(function(req, res) {
            req.logOut();
            res.status(200).end();
        })
        .get(function(req, res) {
            req.logOut();
            res.status(200).end();
            res.redirect('/login');
        });
};
