'use strict';
(function () {
  angular
    .module('app.core')
    .service('dataHelper', dataHelper);

  //NameService.$inject = ['homeSemakanCtrl'];

  function dataHelper (AppSettings, $q, $http) {
    var service = {};

    service.getSst4 = function (value) {
      var deferred = $q.defer();

      $http
        .get(AppSettings.API_URL + '/sst4/' + value)
        .success(deferred.resolve)
        .error(deferred.reject);

      return deferred.promise;
    };

    service.postTawaran = function (url, value) {
      var deferred = $q.defer();

      $http
        .post(AppSettings.API_URL + '/tawaran_sbpt4/' + url, value)
        .success(deferred.resolve)
        .error(deferred.reject);

      return deferred.promise;
    };

    // service.getCalon = function (value) {
    //   var deferred = $q.defer();

    //   $http
    //     .get(AppSettings.API_URL + '/calons/' + value)
    //     .success(deferred.resolve)
    //     .error(deferred.reject);

    //   return deferred.promise;
    // };

    // service.getSbp = function (value) {
    //   var deferred = $q.defer();

    //   $http
    //     .get(AppSettings.API_URL + '/calons/' + value)
    //     .success(deferred.resolve)
    //     .error(deferred.reject);

    //   return deferred.promise;
    // };

    return service;
  }
})();
