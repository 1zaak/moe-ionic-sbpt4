'use strict';
(function () {
  angular
    .module('app.core')
    .service('dataHelper', dataHelper);

  //NameService.$inject = ['homeSemakanCtrl'];

  function dataHelper (AppSettings, $q, $http) {
    var service = {};

    service.getCalon = function (value) {
      var deferred = $q.defer();

      $http
        .get(AppSettings.API_URL + '/calons/' + value)
        .success(deferred.resolve)
        .error(deferred.reject);

      return deferred.promise;
    };

    service.getSbp = function (value) {
      var deferred = $q.defer();

      $http
        .get(AppSettings.API_URL + '/calons/' + value)
        .success(deferred.resolve)
        .error(deferred.reject);

      return deferred.promise;
    };

    return service;
  }
})();
