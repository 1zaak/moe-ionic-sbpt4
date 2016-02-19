'use strict';
angular.module('home.semakan', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider.state('home.semakan', {
            url: '/home',
            views: {
                'tab-home@home': {
                    templateUrl: 'modules/home/home.semakan/views/home-semakan.html'
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('modules/home');
    });
