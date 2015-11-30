'use strict';

module.exports = function(mongoose) {

    var User_ProfileSchema = new mongoose.Schema({
        u_fname: String,
        u_mi: String,
        u_lname: String,
        u_email: String,
        u_password: String,
        log_inDate: Date,
        u_isverified: Number,
        u_image: {
            file_name: String,
            file_type: String,
            url: String,
            file_size: Number
        }
    });

    mongoose.model('Users', User_ProfileSchema);
};
