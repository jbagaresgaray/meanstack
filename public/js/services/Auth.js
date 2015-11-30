'use strict';

angular.module('allinone')
    .factory('Auth', function($cookieStore, $q, $http) {
        var currentUser = {};
        var messages = {};
        // MAIN FACTORY METHODS
        return {
            login: function(employer, callback) {
                return $http({
                    method: 'GET',
                    url: '/api/1.0/login',
                }).then(function(res) {
                    var data = res.data;
                    if (!_.isEmpty(data)) {
                        var response = data.response;
                        $cookieStore.put('token', response.result.token); // there is no token that is coming from the server as of now.
                        currentUser = {
                            _id: response.result._id,
                            firstName: response.result.user.firstName,
                            surName: response.result.user.surName
                        };
                    }
                });
            },
            logout: function() {
                return $http({
                    method: 'GET',
                    url: '/api/1.0/logout',
                }).then(function(res) {
                    var data = res.data;
                    $cookieStore.remove('token');
                    currentUser = {};
                    console.log('data: ', data);
                });
            },

            getCurrentUser: function() {
                return currentUser;
            },
            
            getToken: function() {
                return $cookieStore.get('token');
            }
        };

    });
