'use strict';
angular.module('app.core', [
        'ionic',
        'ngCordova',
        'ui.router',
        'pascalprecht.translate',
        'ngMaterial',
        'ionic.contrib.ui.hscrollcards',
        'ksSwiper',
        'ionic-modal-select'
        // TODO: load other modules selected during generation
    ])
    .config(function($stateProvider, $urlRouterProvider) {

        // ROUTING with ui.router
        $urlRouterProvider.otherwise('/welcome');
        $stateProvider
            .state('home', {
                abstract: true,
                views: {
                    'main@': {
                        templateUrl: 'core/layout/main-layout.html'
                    }
                }
            })
            .state('account', {
                abstract: true,
                views: {
                    'main@': {
                        templateUrl: 'core/layout/account-layout.html'
                    }
                }
            });
    });
