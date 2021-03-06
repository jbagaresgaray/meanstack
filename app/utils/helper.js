'use strict';

module.exports = function(database, app, log) {
    database.connect(function onConnect(err, isConnected) {
        if (err) {
            log.error('Error Connecting Mongodb database');
        } else {
            app.listen(app.get('port'),app.get('ip'), function connection(err) {
                if (err instanceof Error) {
                    log.error('Unable to start Server', app.get('port'));
                } else {
                    log.info('Server started at ' + app.get('port') + ' Using ' + app.get('api_version'));
                }
            });
        }
    });
};
