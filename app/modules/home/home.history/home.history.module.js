'use strict';
angular.module('home.history', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider
            .state('home.history', {
                url: '/history',
                views: {
                    'tab-history@home': {
                        templateUrl: 'modules/home/home.history/views/home-history.html'
                    }
                },
                data: {
                    isSecured: false
                }
            });

        // Translation
        // $translatePartialLoaderProvider.addPart('modules/discover/discover.design');
    });
