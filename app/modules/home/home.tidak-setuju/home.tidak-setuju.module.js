'use strict';
angular.module('home.tidak-setuju', [])
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    $stateProvider.state('home.tidak-setuju', {
      url: '/tidak-setuju?AGILIRAN&NOKP&NAMA&NAMA_SEK&NAMA_SBP&KET_ALIRAN&ALAMAT1&ALAMAT2&POSKOD&NOTEL',
      views: {
        'tab-home@home': {
          templateUrl: 'modules/home/home.tidak-setuju/views/index.html',
          controller: 'homeTidakSetujuCtrl as ctrl'
        }
      }
    });

    // Translation
    $translatePartialLoaderProvider.addPart('modules/home');
  });
