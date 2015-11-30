'use strict';

angular.module('allinone')
    .factory('About', function($http, $q) {
        var abouts = {};

        return {
            getAllAbout: function(callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/1.0/about')
                .success(function(data) {
                    deferred.resolve(data);
                    return cb();
                })
                .error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },
            createAbout: function(data,callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/api/1.0/about',data).
                success(function(data) {
                    console.log('data: ',data);
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },
            updateAbout: function(id,data,callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.put('/api/1.0/about/'+ id,data).
                success(function(data) {
                    console.log('data: ',data);
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },
            deleteAbout: function(id,callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.put('/api/1.0/about/'+ id,data).
                success(function(data) {
                    console.log('data: ',data);
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },
        };
    });
