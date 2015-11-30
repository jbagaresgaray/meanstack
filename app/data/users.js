'use strict';

var bcrypt = require('bcrypt-nodejs');
var sPassword = bcrypt.hashSync('12345', bcrypt.genSaltSync(8), null);

var UsersData = {
    u_fname: 'John',
    u_mi: 'M',
    u_lname: 'Doe',
    u_email: 'sample_account@yopmail.com',
    u_password: sPassword,
    log_inDate: Date.now(),
    u_isverified: 1,
};


module.exports = function(mongoose) {
    var Users = mongoose.model('Users');

    Users.collection.drop();
    Users.create(UsersData);
};
