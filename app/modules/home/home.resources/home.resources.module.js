'use strict';
angular.module('home.resources', [])
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    $stateProvider.state('home.resources', {
      url: '/resources',
      views: {
        'tab-resources@home': {
          templateUrl: 'modules/home/home.resources/views/home-resources.html',
          controller: 'homeResourcesCtrl as ctrl'
        }
      }
    });

    // Translation
    $translatePartialLoaderProvider.addPart('modules/home');
  });
