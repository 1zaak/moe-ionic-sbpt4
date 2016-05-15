'use strict';
angular.module('home.setuju')
  .controller('homeSetujuCtrl', function ($cordovaFileOpener2, $timeout, $cordovaFileTransfer, $ionicLoading, $window, $document, $scope, utilService, $stateParams, $ionicPlatform, $cordovaInAppBrowser, AppSettings) {
    var vm = this;

    vm.peribadi = $stateParams;

    vm.exit = function () {
      $stateParams = {};
      utilService.go('home.semakan');
    };

    vm.openBuku = function () {
      $window.close();
      $ionicPlatform.ready(function () {
        $ionicLoading.show();
        var url = 'http://mobile2.moe.gov.my/BUKU_TAWARAN_T4.pdf';
        var targetPath = $window.cordova.file.externalDataDirectory + 'BUKU_TAWARAN_T4.pdf';
        var trustHosts = true;
        var options = {};

        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
          .then(function (result) {
            // Success!
            vm.result = result;
            $ionicLoading.hide();
            $window.localforage.setItem('BUKU_TAWARAN_T4.pdf', targetPath, function () {
            // Do other things once the value has been saved.
              $ionicLoading.hide();
            });
            $cordovaFileOpener2.open(targetPath, 'application/pdf')
              .then(function () {
                vm.readStatus = 'Opened PDF!';
              }, function (err) {
                vm.readStatus = err;
              });
          }, function (err) {
            // Error
            vm.error = err;
            $ionicLoading.hide();
          }, function (progress) {
            $timeout(function () {
              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            });
          });

        // var options = {
        //   location: 'yes',
        //   clearcache: 'yes',
        //   toolbar: 'no'
        // };
        // $window.open(encodeURI('http://mobile2.moe.gov.my/BUKU_TAWARAN_T4.pdf'), '_blank', 'location=yes,EnableViewPortScale=yes');
        // $cordovaInAppBrowser.open('http://mobile2.moe.gov.my/BUKU_TAWARAN_T4.pdf', '_blank', options)
        //   .then(function () {
        //     // success
        //     $ionicLoading.hide();
        //   })
        //   .catch(function () {
        //     // error
        //     $ionicLoading.hide();
        //   });

        // $cordovaInAppBrowser.close();

      });
    };

    vm.openSurat = function () {
      $window.close();
      $ionicPlatform.ready(function () {
        $ionicLoading.show();
        var sFileName = vm.peribadi.AGILIRAN + '-' + vm.peribadi.NOKP + '.pdf';
        var url = AppSettings.API_URL + '/pdf/' + vm.peribadi.AGILIRAN + '/' + vm.peribadi.NOKP;
        var targetPath = $window.cordova.file.externalDataDirectory + sFileName;
        var trustHosts = true;
        var options = {};

        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
          .then(function (result) {
            // Success!
            vm.result = result;
            localforage.setItem(sFileName, targetPath, function () {
            // Do other things once the value has been saved.
              $ionicLoading.hide();
            });
            $cordovaFileOpener2.open(targetPath, 'application/pdf')
              .then(function () {
                vm.readStatus = 'Opened PDF!';
              }, function (err) {
                vm.readStatus = err;
              });
          }, function (err) {
            // Error
            vm.error = err;
            $ionicLoading.hide();
          }, function (progress) {
            $timeout(function () {
              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            });
          });

        // var options = {
        //   location: 'yes',
        //   clearcache: 'yes',
        //   toolbar: 'no'
        // };

        // var url = AppSettings.API_URL + '/pdf/' + vm.peribadi.AGILIRAN + '/' + vm.peribadi.NOKP;
        // vm.test = url;
        // $cordovaInAppBrowser.open('http://www.google.com', '_system', options)
        // // $cordovaInAppBrowser.open(url, '_system', options)
        //   .then(function (event) {
        //     $ionicLoading.hide();
        //     // success
        //     $ionicLoading.hide();
        //     vm.test = 'cordovaInAppBrowser running ' + event;
        //   })
        //   .catch(function (event) {
        //     $ionicLoading.hide();
        //     // error
        //     $ionicLoading.hide();
        //     vm.test = 'cordovaInAppBrowser running ' + event;
        //   });

        // $cordovaInAppBrowser.close();

      });

    };
  });

  // $ionicLoading.show({
  //   template: 'Loading...'
  // });

  // var LocalFileSystem = {};
  // var window = {};

  // $ionicPlatform.ready(function () {

  //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
  //     fs.root.getFile('test.pdf',
  //       {
  //         create: true,
  //         exclusive: false
  //       },
  //       function gotFileEntry (fe) {
  //         var p = fe.toURL();
  //         fe.remove();
  //         var ft = new $cordovaFileTransfer;
  //         ft.download(encodeURI('https://dl.dropboxusercontent.com/u/91286314/BUKU_TAWARAN_T4.pdf'),
  //           p,
  //           function (entry) {
  //             $ionicLoading.hide();
  //             vm.pdfFile = entry.toURL();
  //           },
  //           function (entry) {
  //             $ionicLoading.hide();
  //             vm.pdfFile = entry.toURL();
  //           },
  //           false,
  //           null
  //         );
  //       },
  //       function () {
  //         $ionicLoading.hide();
  //       // console.log("Get File Fail");
  //       //get File Fail
  //       });
  //   });

  // });
  // $cordovaFileTransfer.download('https://dl.dropboxusercontent.com/u/91286314/BUKU_TAWARAN_T4.pdf',
  //   'file:///storage/sdcard0/pdf/pdf-test.pdf',
  //   true,
  //   {}).then(function (result) {
  //   // Success!
  //   $cordovaDialogs.alert('Wow!', result);
  //   $ionicLoading.hide();
  // }, function (err) {
  //   // An error occured. Show a message to the user
  //   $cordovaDialogs.alert(err);
  //   $ionicLoading.hide();
  // });


  // vm.openBuku = function () {
  // $scope.pdfUrl = '/core/assets/pdf/BUKU_TAWARAN_T4.pdf';

  // vm.modal.show();

  // downloadHelper.downloadFile()
  // .then(function (result){

  // });
  // };
