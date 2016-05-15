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
    }).state('home.resources.item', {
      url: '/resources/item?AGILIRAN&NOKP&NAMA&NAMA_SEK&NAMA_SBP&KET_ALIRAN&ALAMAT1&ALAMAT2&POSKOD&NOTEL',
      views: {
        'tab-resources@home': {
          templateUrl: 'modules/home/home.resources/views/item.html',
          controller: 'homeResourcesItemCtrl as ctrl'
        }
      }
    });

    // Translation
    $translatePartialLoaderProvider.addPart('modules/home');
  });
