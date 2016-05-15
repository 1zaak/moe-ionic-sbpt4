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

      // $http({
      //   method: 'JSONP',
      //   url: AppSettings.API_URL + '/sst4/' + value
      // }).get(AppSettings.API_URL + '/sst4/' + value)
      //   .success(deferred.resolve)
      //   .error(deferred.reject);
        // $http
        //   .get('http://jsonplaceholder.typicode.com/')
        //   .success(deferred.resolve)
        //   .error(deferred.reject);

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

    service.pushLocal = function (item) {
      localStorage.setItem(item);
    };

    service.setLogoutToken = function () {
      sessionStorage.setItem('loggedIn', 'notLoggedIn');
    };

    return service;
  }
})();
