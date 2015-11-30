'use strict';

module.exports = {
    env : 'development',
    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/Sample',
    db_user: process.env.DB_USER || 'Sample',
    db_password: process.env.DB_USER || '12345',
    port: process.env.PORT || process.env.APP_PORT || 3000, // PLEASE DONT REMOVE 'process.env.PORT'
    ip: process.env.IP,
    socket_port: process.env.SOCKET_PORT || 3333,
    app_name: process.env.APP_NAME || "Sample",
    api_host_url: process.env.API_HOST_URL || 'http://localhost:3000',
    frontend_host_url: process.env.FRONTEND_HOST_URL || 'http://localhost:9000',
    api_version: process.env.API_VERSION || '/api/1.0',
    token_secret: 'secretkey',
};
