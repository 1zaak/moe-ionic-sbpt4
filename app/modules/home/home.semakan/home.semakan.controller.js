'use strict';
angular.module('home.semakan')
  .controller('homeSemakanCtrl', function ($scope, utilService, dataHelper, $window, lodash, $ionicPlatform, $ionicPopup) {
    var vm = this;
    var refreshData = function () {
      vm.agiliran = '123';
      vm.mykad = undefined;
      vm.isLoading = false;
      vm.sbp = undefined;
      vm.calon = undefined;
      vm.statusSemakan = 'Semakan';
    };
    refreshData();

    // //for development purposes only
    // vm.agiliran = 'BH157K097';
    // vm.mykad = '001206031203';
    utilService.getModal($scope, 'modules/home/home.semakan/views/semakan-modal.html', 'slide-in-up')
      .then(function (modal) {
        vm.semakanModal = modal;
      });

    var getSst4 = function (value) {
      vm.statusSemakan = undefined;
      vm.isLoading = true;
      dataHelper.getSst4(value)
        .then(function (data) {
          vm.peribadi = data;
          vm.isLoading = false;
          vm.semakanModal.show();
          // console.log(data);
        }, function (data) {
          if (data === null || data === undefined) {
            // console.log(data);
            vm.isLoading = false;
            vm.statusSemakan = 'Data undefined / null.';
          } else if (data.status === 'not found') {
            vm.peribadi = data;
            vm.isLoading = false;
            vm.statusSemakan = 'Calon tiada dalam database.';
          } else {
            vm.statusSemakan = 'Server tiada respons.';
          }
        });
    };

    var postTawaran = function (url, value) {
      value = JSON.stringify(value);
      dataHelper.postTawaran(url, value)
        .then(function (data) {
          return data;
        }, function (data) {
          return data;
        });
    };

    vm.hapus = function () {
      refreshData();
    };

    vm.uppercase = function () {
      vm.agiliran = vm.agiliran.toUpperCase().trim();
    };

    vm.semak = function () {
      if (vm.agiliran !== undefined && vm.mykad !== undefined) {
        var query = vm.agiliran + '/' + vm.mykad;
        getSst4(query);
      } else {
        vm.statusSemakan = 'Sila masukkan data..';
      }
    };

    vm.hantar = function () {
      $ionicPlatform.ready(function () {
        vm.setuju = true;
        var url = vm.peribadi.agiliran;
        var data = {
          SETUJU_TERIMA: vm.setuju,
          TKH_SETUJU_TERIMA: Date(),
          id: Math.random()
        };
        postTawaran(url, data);
        var peribadi = lodash.assign(vm.peribadi, data);
        var list = [];
        list.push(peribadi);
        vm.semakanModal.hide();
        refreshData();
        utilService.go('home.setuju', peribadi);
        // $window.localforage.getItem('moeSearchHistory', function (err, value) {
        //   // Run this code once the value has been
        //   // loaded from the offline store.
        //   if (value === null) {
        //     $window.localforage.setItem('moeSearchHistory', list, function () {
        //       vm.semakanModal.hide();
        //       refreshData();
        //       utilService.go('home.setuju', peribadi);
        //     });
        //   } else if (value !== null) {
        //     var history = value;
        //     var newList = lodash.concat(history, list);
        //     vm.semakanModal.hide();
        //       refreshData();
        //     utilService.go('home.setuju', vm.peribadi);
        //     // $window.localforage.setItem('moeSearchHistory', newList, function () {
        //     //   vm.semakanModal.hide();
        //     //   refreshData();
        //     //   // utilService.go('home.resources.item', vm.peribadi);
        //     //   utilService.go('home.setuju', vm.peribadi);
        //     // });
        //   }
        // });

      }, false);
    };
    // A confirm dialog

    vm.showConfirm = function () {
      $ionicPlatform.ready(function () {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Tidak Setuju',
          template: 'Adakah anda pasti tidak setuju?',
          cancelText: 'Tidak',
          okText: 'Ya'
        });

        confirmPopup.then(function (res) {
          if (res) {
            vm.setuju = false;
            var url = vm.peribadi.agiliran;
            var data = {
              SETUJU_TERIMA: vm.setuju,
              TKH_SETUJU_TERIMA: Date(),
              id: Math.random()
            };
            postTawaran(url, data);
            utilService.go('home.tidak-setuju', vm.peribadi);
            vm.semakanModal.hide();
            refreshData();
          } else {
            confirmPopup.close();
          }
        });
      }, false);
    };

    vm.closeSemak = function () {
      vm.semakanModal.hide();
      refreshData();
    };

    vm.closeRayuanBerjaya = function () {
      vm.semakanModal.hide();
      vm.rayuanBerjayaModal.hide();
      refreshData();
    };

    vm.kembali = function () {
      vm.semakanModal.hide();
      refreshData();
    };

    $scope.$on('$destroy', function () {
      vm.semakanModal.remove();
    });
  });
