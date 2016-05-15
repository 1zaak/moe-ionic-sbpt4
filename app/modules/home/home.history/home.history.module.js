'use strict';
angular.module('home.history', ['ngLodash'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.history', {
        url: '/history',
        views: {
          'tab-history@home': {
            templateUrl: 'modules/home/home.history/views/home-history.html',
            controller: 'homeHistoryCtrl as ctrl'
          }
        }
      });
  });
