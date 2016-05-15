'use strict';
angular.module('home.history')
  .controller('homeHistoryCtrl', function ($ionicPlatform, $window) {
    var vm = this;

    $window.localforage.iterate(function (value, key) {
      // Resulting key/value pair -- this callback
      // will be executed for every item in the
      // database.
      vm.saved = [key, value];
    }, function (err) {
      vm.saved = err;
      if (!err) {
        vm.saved = err;
      }
    });

    // vm.shouldShowDelete = false;
    // vm.showDelete = function () {
    //   if (vm.shouldShowDelete === false) {
    //     vm.shouldShowDelete = true;
    //   } else {
    //     vm.shouldShowDelete = false;
    //   }
    // };

    // var getHistory = function () {
    //   localforage.getItem('moeSearchHistory', function (err, value) {
    //     // Run this code once the value has been
    //     // loaded from the offline store.
    //     vm.saved = value;
    //   });
    // };

    // getHistory();

    // $ionicPlatform.ready(function () {
    //   getHistory();
    //   vm.load = function () {
    //     $window.localforage.getItem('moeSearchHistory', function (err, value) {
    //       // Run this code once the value has been
    //       // loaded from the offline store.
    //       vm.saved = value;
    //     });

    //   };

    //   vm.deleteAll = function () {
    //     $window.localStorage.removeItem('moeSearchHistory');
    //     vm.saved = [];
    //   };

    //   vm.delete = function (agiliran) {
    //     $window.localforage.getItem('moeSearchHistory', function (err, value) {
    //       // Run this code once the value has been
    //       // loaded from the offline store.
    //       vm.saved = value;
    //       var selObject = lodash.find(value, {
    //         'agiliran': agiliran
    //       });

    //       lodash.remove(value, function (obj) {
    //         return lodash.isEqual(obj, selObject);

    //       });
    //       $window.localforage.removeItem('moeSearchHistory', function () {
    //         $window.localforage.setItem('moeSearchHistory', value, function () {
    //         });

    //       });

    //     });
    //     getHistory();
    //   };
    // }, false);

  });
