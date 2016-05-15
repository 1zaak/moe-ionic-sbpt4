'use strict';
angular.module('home.setuju', [])
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    $stateProvider.state('home.setuju', {
      url: '/setuju?AGILIRAN&NOKP&NAMA&NAMA_SEK&NAMA_SBP&KET_ALIRAN&ALAMAT1&ALAMAT2&POSKOD&NOTEL',
      views: {
        'tab-home@home': {
          templateUrl: 'modules/home/home.setuju/views/index.html',
          controller: 'homeSetujuCtrl as ctrl'
        }
      }
    });

    // Translation
    $translatePartialLoaderProvider.addPart('modules/home');
  });
