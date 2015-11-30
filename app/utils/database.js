'use strict';

var Database = function(mongoose, config) {
    var self = this;
    self.connect = function onConnect(cb) {
        mongoose.connection.on('connected', function onConnected(ref) {
            return cb(null, true);
        });

        mongoose.connection.on('error', function onError(err) {
            self.closeConnection();
            return cb(err, false);
        });

        mongoose.connection.on('disconnected', function onDisconnected() {
            self.closeConnection();
            return cb(new Error('DB disconnected'), false);
        });

        mongoose.connect(config.dbUrl);
    };

    self.closeConnection = function onClose() {
        mongoose.connection.close(function onClose() {
            process.exit(0);
        });
    };
};

exports.Database = Database;