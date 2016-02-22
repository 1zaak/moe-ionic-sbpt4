'use strict';
angular.module('app.core')
  .service('utilService', function ($q, $ionicModal, $state) {

    var api = {};

    api.getModal = function (scope, url, animation) {
      var deferred = $q.defer();

      $ionicModal.fromTemplateUrl(url, {
        scope: scope,
        animation: animation
      }).then(deferred.resolve);

      return deferred.promise;
    };


    api.go = function (param1, param2) {
      if (param2 === undefined) {
        $state.go(param1);
      } else {
        var s = JSON.parse(JSON.stringify(param2));
        $state.go(param1, s);
      }
    };


    return api;

  });
