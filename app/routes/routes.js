'use strict';

var userCtrl = require('../controllers/userscontroller');
var validatorUsers = require('../validation/user');

module.exports = function(app, passport, config, middleware) {

    // ======================== AUTHENTICATION ============================ //
    app.route(config.api_version + '/login')
        .get(userCtrl.updateLogDate)
        .post(validatorUsers.validateLogin, passport.authenticate('user'), function onRequest(req, res) {
            res.send(req.user);
        });

    app.route(config.api_version + '/logout')
        .get(userCtrl.logout);

    app.route(config.api_version + '/about')
        .get(userCtrl.getAllUsers)
        .post(userCtrl.createUser);

    app.route(config.api_version + '/about/:id')
        .get(userCtrl.getUserById)
        .put(userCtrl.updateUser)
        .delete(userCtrl.deleteUser);

};
