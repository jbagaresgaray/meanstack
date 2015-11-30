'use strict';

var async = require('async');
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

// Create
exports.createUser = function createUser(data, next) {
    Users.create(data, next);
};

//Read
exports.getUserById = function getUserById(id, next) {
    Users.findById(id, next);
};

//Get All
exports.getAllUsers = function getAllUsers(next) {
    Users.find(next);
};

// Update
exports.updateUser = function updateUser(id, data, next) {
    Users.update(id, data, next);
};

//Delete
exports.deleteUser = function deleteUser(id, next) {
    Users.findByIdAndRemove(id, next);
};

exports.findOneUserAndUpdate = function findOneUserAndUpdate(obj, data, next) {
    Users.findOneAndUpdate(obj, data, next);
};

