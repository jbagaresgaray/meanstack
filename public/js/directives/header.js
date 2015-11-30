'use strict';
angular.module('allinone')
    .directive('navBar', function() {
        return {
            restrict: 'AE',
            templateUrl: 'public/templates/directives/header.html'
        };
    });
