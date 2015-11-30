'use strict';
angular.module('allinone', [
        'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'cgBusy',
        'ui.select', 'ngFileUpload', 'angular-loading-bar', 'toastr', 'ncy-angular-breadcrumb', 'validation', 'validation.rule',
        'ngDialog','ngTable','nvd3'
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $stateProvider
            .state('main', {
                url: '/home',
                templateUrl: 'public/templates/main.html',
                controller: 'mainCtrl',
                ncyBreadcrumb: {
                    label: 'Dashboard'
                },
                resolve:{
                    currentUser: function(Auth){
                        return Auth.login();
                    }
                }
            })
            .state('about', {
                url: '/home/about',
                templateUrl: 'public/templates/about.html',
                controller: 'chartCtrl',
                ncyBreadcrumb: {
                    label: 'Manage Charts',
                    parent: 'main'
                },
                resolve:{
                    currentUser: function(Auth){
                        return Auth.login();
                    }
                }
            });
        $urlRouterProvider.otherwise('/home');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })
    .config(['ngDialogProvider', function(ngDialogProvider) {
        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            plain: false,
            showClose: false,
            closeByDocument: false,
            closeByEscape: true
        });
    }])
    .run(function($rootScope, $location, Auth) {
        $rootScope.logout = function(){
            console.log('logout');
            Auth.logout().then(function(response){
                console.log('response: ',response);
                
                window.location.href="/login";
            });
        };
    });
