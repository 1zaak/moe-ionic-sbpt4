'use strict';
angular.module('account.welcome', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state('account.welcome', {
        url: '/welcome',
        views: {
          'content@account': {
            templateUrl: 'modules/account/account.welcome/views/account.welcome.html'
          }
        },
        data: {
          isSecured: false
        }
      });
  });
