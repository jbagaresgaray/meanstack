'use strict';

var userdaos = require('../daos/userdaos');

function Users() {
    this.userdaos = userdaos;
}

Users.prototype.createUser = function(data, next) {
    userdaos.createUser(data, next);
};

Users.prototype.getUserById = function(id,next) {
    userdaos.getUserById(next);
};

Users.prototype.getAllUsers = function(next){
	userdaos.getAllUsers(next);
}

Users.prototype.updateUser = function(id, data, next) {
    userdaos.updateUser(id, data, next);
};

Users.prototype.deleteUser = function(id, next) {
    userdaos.deleteUser(id, next);
};

exports.Users = Users;
