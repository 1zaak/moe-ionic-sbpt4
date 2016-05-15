'use strict';
angular.module('home.resources')
  .controller('homeResourcesItemCtrl', function (AppSettings, $scope, utilService, $stateParams, $ionicModal, $ionicPlatform, $cordovaInAppBrowser) {
    var vm = this;

    vm.peribadi = $stateParams;

    vm.exit = function () {
      $stateParams = {};
      utilService.go('home.resources.item');
      utilService.go('home.history');
    };

    // Initialize the modal view.
    $ionicModal.fromTemplateUrl('/modules/home/home.resources/views/pdf-home.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      vm.modal = modal;
    });

    vm.openBuku = function () {
      $ionicPlatform.ready(function () {
        var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'yes'
        };

        $cordovaInAppBrowser.open('http://mobile2.moe.gov.my/BUKU_TAWARAN_T4.pdf', '_blank', options)
          .then(function (event) {
            // success
            vm.event = event;
          })
          .catch(function (event) {
            // error
            vm.event = event;
          });


        $cordovaInAppBrowser.close();

      }, false);
    };

    vm.openSurat = function () {
      $ionicPlatform.ready(function () {
        var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'yes'
        };

        var value = vm.peribadi.AGILIRAN + '/' + vm.peribadi.NOKP;
        // $cordovaInAppBrowser.open('https://dl.dropboxusercontent.com/u/91286314/suratawar.pdf', '_blank', options)
        $cordovaInAppBrowser.open(AppSettings.API_URL + '/pdf/' + value, '_blank', options)
          .then(function (event) {
            // success
            vm.event = event;
          })
          .catch(function (event) {
            // error
            vm.event = event;
          });


        $cordovaInAppBrowser.close();

      }, false);
    };
  });
