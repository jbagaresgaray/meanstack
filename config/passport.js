'use strict';

var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash-node');

var mongoose = require('mongoose');
var User = mongoose.model('Users');


module.exports = function(passport, jwt, config) {

    passport.use('user', new LocalStrategy(
        function(username, password, done) {
            User.findOne({
                    u_email: username
                })
                .exec(verifyAuth(password, done));
        }
    ));

    passport.use('user_default', new LocalStrategy(function(username, password, done) {
        User.findOne({
            u_email: username
        }, verifyAuth2(password, done));
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    function verifyAuth(password, done) {
        return function(err, user) {
            if (err) {
                console.log('error:', err);
                return done(err);
            }

            if (_.isEmpty(user)) {
                return done(null, {
                    msg: 'User does not exist with this email address.',
                    success: false,
                    result: ''
                });
            } else {
                if (user.u_isverified === 0) {
                    return done(null, {
                        msg: 'Your account has not been activated. Please check your mail for activation link.',
                        success: false,
                        result: ''
                    });
                } else {
                    if (!bcrypt.compareSync(password, user.u_password)) {
                        return done(null, {
                            msg: 'Invalid Username or Password',
                            success: false,
                            result: ''
                        });
                    }

                    var token = jwt.sign(user, config.token_secret, {
                        expiresInMinutes: 60 * 5
                    });

                    return done(null, {
                        msg: 'Login successfully',
                        success: true,
                        result: {
                            _id: user._id,
                            user: {
                                firstName: user.u_fname,
                                surName: user.u_lname
                            },
                            email: user.u_email,
                            token: token
                        }
                    });
                }
            }

        };
    }

    function verifyAuth2(password, done) {
        return function(err, user) {
            console.log('user: ' + user);
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (!bcrypt.compareSync(password, user.u_password)) {
                return done(null, false);
            }

            // return done(null, user);
            var token = jwt.sign(user, config.token_secret, {
                expiresInMinutes: 60 * 5
            });

            return done(null, {
                msg: 'Login successfully',
                success: true,
                result: {
                    _id: user._id,
                    user: {
                        firstName: user.u_fname,
                        surName: user.u_lname
                    },
                    email: user.u_email,
                    token: token
                }
            });
        }
    }



};
