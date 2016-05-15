'use strict';
angular.module('home.tidak-setuju', [])
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    $stateProvider.state('home.tidak-setuju', {
      url: '/tidak-setuju?AGILIRAN&NOKP&NAMA&NAMA_SEK&NAMA_SBP&KET_ALIRAN&ALAMAT1&ALAMAT2&POSKOD&NOTEL',
      views: {
        'tab-home@home': {
          templateUrl: 'modules/home/home.tidak-setuju/views/index.html',
          controller: 'homeTidakSetujuCtrl as ctrl'
        }
      }
    });

    // Translation
    $translatePartialLoaderProvider.addPart('modules/home');
  });

'use strict';
angular.module('home.tidak-setuju')
  .controller('homeTidakSetujuCtrl', function ($scope, utilService, dataHelper, $stateParams) {
    var vm = this;

    vm.peribadi = $stateParams;

  });

'use strict';
angular.module('home.setuju', [])
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    $stateProvider.state('home.setuju', {
      url: '/setuju?AGILIRAN&NOKP&NAMA&NAMA_SEK&NAMA_SBP&KET_ALIRAN&ALAMAT1&ALAMAT2&POSKOD&NOTEL',
      views: {
        'tab-home@home': {
          templateUrl: 'modules/home/home.setuju/views/index.html',
          controller: 'homeSetujuCtrl as ctrl'
        }
      }
    });

    // Translation
    $translatePartialLoaderProvider.addPart('modules/home');
  });

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

'use strict';
angular.module('home.semakan', [])
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    $stateProvider.state('home.semakan', {
      url: '/home',
      views: {
        'tab-home@home': {
          templateUrl: 'modules/home/home.semakan/views/home-semakan.html',
          controller: 'homeSemakanCtrl as ctrl'
        }
      }
    });

    // Translation
    $translatePartialLoaderProvider.addPart('modules/home');
  });

'use strict';
angular.module('home.semakan')
  .controller('homeSemakanCtrl', function ($scope, utilService, dataHelper, $window, lodash, $ionicPlatform, $ionicPopup) {
    var vm = this;
    var refreshData = function () {
      vm.agiliran = undefined;
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

'use strict';
angular.module('home.resources', [])
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    $stateProvider.state('home.resources', {
      url: '/resources',
      views: {
        'tab-resources@home': {
          templateUrl: 'modules/home/home.resources/views/home-resources.html',
          controller: 'homeResourcesCtrl as ctrl'
        }
      }
    }).state('home.resources.item', {
      url: '/resources/item?AGILIRAN&NOKP&NAMA&NAMA_SEK&NAMA_SBP&KET_ALIRAN&ALAMAT1&ALAMAT2&POSKOD&NOTEL',
      views: {
        'tab-resources@home': {
          templateUrl: 'modules/home/home.resources/views/item.html',
          controller: 'homeResourcesItemCtrl as ctrl'
        }
      }
    });

    // Translation
    $translatePartialLoaderProvider.addPart('modules/home');
  });

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

'use strict';
angular.module('home.resources')
  .controller('homeResourcesCtrl', function ($scope, $ionicModal, utilService, dataHelper, ReportSvc, $ionicLoading) {
    var vm = this;

    $scope.runReport = _runReport;
    $scope.clearReport = _clearReport;
    // console.log(_clearReport);
    _activate();

    function _activate () {
      //
      // ReportSvc Event Listeners: Progress/Done
      //    used to listen for async progress updates so loading text can change in
      //    UI to be repsonsive because the report process can be 'lengthy' on
      //    older devices (chk reportSvc for emitting events)
      //
      $scope.$on('ReportSvc::Progress', function (event, msg) {
        _showLoading(msg);
      });
      $scope.$on('ReportSvc::Done', function (event, err) {
        _hideLoading();
        if (err !== null || undefined) {
          return err;
        }
      });
    }

    function _runReport () {
      //if no cordova, then running in browser and need to use dataURL and iframe
      if (!window.cordova) {
        // console.log("Window is not cordova");
        ReportSvc.runReportDataURL({}, {})
          .then(function (dataURL) {
            //set the iframe source to the dataURL created
            // console.log('report run in browser using dataURL and iframe');
            document.getElementById('pdfImage').src = dataURL;
          });
        return true;
      }
      //if codrova, then running in device/emulator and able to save file and open w/ InAppBrowser
      else {
        ReportSvc.runReportAsync({}, {})
          .then(function (filePath) {
            //log the file location for debugging and oopen with inappbrowser
            // console.log('report run on device using File plugin');
            // console.log('ReportCtrl: Opening PDF File (' + filePath + ')');
            window.open(filePath, '_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
            _hideLoading();
          });
        return true;
      }
    }

    //reset the iframe to show the empty html page from app start
    function _clearReport () {
      document.getElementById('pdfImage').src = 'modules/home/home.resources/view/empty.html';
    }
    //
    // Loading UI Functions: utility functions to show/hide loading UI
    //
    function _showLoading (msg) {
      $ionicLoading.show({
        template: msg
      });
    }
    function _hideLoading () {
      $ionicLoading.hide();
    }


    //pdf.js
    // function getDummyData () {
    //   return {
    //     Date: new Date().toLocaleDateString('en-IE', {
    //       year: 'numeric',
    //       month: 'long',
    //       day: 'numeric'
    //     }),
    //     AddressFrom: {
    //       Name: 'izaak',
    //       Address: '123',
    //       Country: 'malaysia'
    //     },
    //     AddressTo: {
    //       Name: 'izaak',
    //       Address: '123',
    //       Country: 'malaysia'
    //     },
    //     Items: [
    //       {
    //         Description: 'iPhone 6S',
    //         Quantity: '1',
    //         Price: '€700'
    //       },
    //       {
    //         Description: 'Samsung Galaxy S6',
    //         Quantity: '2',
    //         Price: '€655'
    //       }
    //     ],
    //     Subtotal: '€2010',
    //     Shipping: '€6',
    //     Total: '€2016'
    //   };
    // }

    function setDefaultsForPdfViewer ($scope) {
      $scope.scroll = 0;
      $scope.loading = 'loading';

      // $scope.onError = function (error) {
      // console.error(error);
      // };

      // $scope.onLoad = function () {
      //   $scope.loading = '';
      // };

    // $scope.onProgress = function (progress) {
    // console.log(progress);
    // };
    }

    setDefaultsForPdfViewer($scope);

    // Initialize the modal view.
    $ionicModal.fromTemplateUrl('/modules/home/home.resources/views/pdf-home.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      vm.modal = modal;
    });

    vm.createInvoice = function () {
      // var invoice = getDummyData();
      $scope.pdfUrl = '/core/assets/pdf/BUKU_TAWARAN_T4.pdf';
      vm.modal.show();
      // InvoiceService.createPdf(invoice)
      //   .then(function (pdf) {
      //     var blob = new Blob([pdf], {
      //       type: 'application/pdf'
      //     });
      //     // $scope.pdfUrl = URL.createObjectURL(blob);
      // $scope.pdfUrl = '/core/assets/pdf/BUKU_TAWARAN_T4.pdf'

    //     // Display the modal view
    //     vm.modal.show();
    //   });
    };
    // Clean up the modal view.
    $scope.$on('$destroy', function () {
      vm.modal.remove();
    });
  });

'use strict';
angular.module('home', [
  'home.semakan',
  'home.history',
  'home.resources',
  'home.setuju',
  'home.tidak-setuju'
]);

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

'use strict';
angular.module('account', ['account.welcome',
]);

'use strict';
angular.module('app.core', [
  'ionic',
  'ngCordova',
  'ui.router',
  'pascalprecht.translate',
  'ngMaterial',
  'ionic.contrib.ui.hscrollcards',
  'ksSwiper',
  'ionic-modal-select',
  'angularMoment',
  'ngLodash',
])
  .config(function ($stateProvider, $urlRouterProvider) {
    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/welcome');
    $stateProvider
      .state('home', {
        abstract: true,
        views: {
          'main@': {
            templateUrl: 'core/layout/main-layout.html'
          }
        }
      })
      .state('account', {
        abstract: true,
        views: {
          'main@': {
            templateUrl: 'core/layout/account-layout.html'
          }
        }
      });
  });

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

//
// Async Report Service
//
// This service provides the ability to save to file a report using a set of methods run
// async to allow progress reporting.  The async processing is acheived by using promises
// and the $q service from angular.  This async work will allow for a repsonsive UI during
// processing, which can be slow on older phones
//
// REQ'D: pdfmake libraries https://github.com/bpampuch/pdfmake
//
'use strict';
(function () {
  // attach the service to the [starter.services] module in angular
  angular.module('app.core')
    .service('ReportSvc', ['$q', '$rootScope', '$timeout', 'ReportBuilderSvc',
      reportSvc]);
  // genReportDef --> genReportDoc --> buffer[] --> Blob() --> saveFile --> return filePath
  //
  //  Events: ReportSvc::Progress, ReportSvc::Done
  //
  // function reportSvc ($q, $rootScope, $timeout, ReportBuilderSvc) {
  function reportSvc () {
    // this.runReportAsync = _runReportAsync;
    // this.runReportDataURL = _runReportDataURL;
    //
    // RUN ASYNC: runs the report async mode w/ progress updates and delivers a local fileUrl for use
    //
    // function _runReportAsync (player, transcript) {
    //   var deferred = $q.defer();

    //   showLoading('1.Processing Transcript');
    //   generateReportDef(player, transcript).then(function (docDef) {
    //     showLoading('2. Generating Report');
    //     return generateReportDoc(docDef);
    //   }).then(function (pdfDoc) {
    //     showLoading('3. Buffering Report');
    //     return generateReportBuffer(pdfDoc);
    //   }).then(function (buffer) {
    //     showLoading('4. Saving Report File');
    //     return generateReportBlob(buffer);
    //   }).then(function (pdfBlob) {
    //     showLoading('5. Opening Report File');
    //     return saveFile(pdfBlob);
    //   }).then(function (filePath) {
    //     hideLoading();
    //     deferred.resolve(filePath);
    //   }, function (error) {
    //     hideLoading();
    //     // console.log('Error: ' + error.toString());
    //     deferred.reject(error);
    //   });
    //   return deferred.promise;
    // }
    //
    // RUN DATAURL: runs the report async mode w/ progress updates and stops w/ pdfDoc -> dataURL string conversion
    //
    // function _runReportDataURL (player, transcript) {
    //   var deferred = $q.defer();
    //   showLoading('1.Processing Transcript');
    //   generateReportDef(player, transcript).then(function (docDef) {
    //     showLoading('2. Generating Report');
    //     return generateReportDoc(docDef);
    //   }).then(function (pdfDoc) {
    //     showLoading('3. Convert to DataURL');
    //     return getDataURL(pdfDoc);
    //   }).then(function (outDoc) {
    //     hideLoading();
    //     deferred.resolve(outDoc);
    //   }, function (error) {
    //     hideLoading();
    //     // console.log('Error: ' + error.toString());
    //     deferred.reject(error);
    //   });
    //   return deferred.promise;
    // }
    //
    // 1.GenerateReportDef: use currentTranscript to craft reportDef JSON for pdfMake to generate report
    //
    // function generateReportDef () {
    //   var deferred = $q.defer();

    //   // removed specifics of code to process data for drafting the doc
    //   // layout based on player, transcript, courses, etc.
    //   // currently mocking this and returning a pre-built JSON doc definition

    //   //use rpt service to generate the JSON data model for processing PDF
    //   // had to use the $timeout to put a short delay that was needed to
    //   // properly generate the doc declaration
    //   $timeout(function () {
    //     var dd = {};
    //     dd = ReportBuilderSvc.generateReport();
    //     deferred.resolve(dd);
    //   }, 100);

    //   return deferred.promise;
    // }
    //
    // 2.GenerateRptFileDoc: take JSON from rptSvc, create pdfmemory buffer, and save as a local file
    //  in: json docDef, out: pdfDoc object
    //
    // function generateReportDoc (docDefinition) {
    //   //use the pdfmake lib to create a pdf from the JSON created in the last step
    //   var deferred = $q.defer();
    //   try {
    //     //use the pdfMake library to create in memory pdf from the JSON
    //     var pdfDoc = pdfMake.createPdf(docDefinition);
    //     deferred.resolve(pdfDoc);
    //   } catch (e) {
    //     deferred.reject(e);
    //   }

    //   return deferred.promise;
    // }
    //
    // 3.GenerateRptBuffer: pdfKit object pdfDoc --> buffer array of pdfDoc
    //  in: pdfDoc object out: buffer[]
    //
    // function generateReportBuffer (pdfDoc) {
    //   //use the pdfmake lib to get a buffer array of the pdfDoc object
    //   var deferred = $q.defer();
    //   try {
    //     //get the buffer from the pdfDoc
    //     pdfDoc.getBuffer(function (buffer) {
    //       $timeout(function () {
    //         deferred.resolve(buffer);
    //       }, 100);
    //     });
    //   } catch (e) {
    //     deferred.reject(e);
    //   }

    //   return deferred.promise;
    // }
    //
    // 3b.getDataURL: pdfKit object pdfDoc --> encoded dataUrl
    //  in: pdfDoc object out: dataUrl
    //
    // function getDataURL (pdfDoc) {
    //   //use the pdfmake lib to create a pdf from the JSON created in the last step
    //   var deferred = $q.defer();
    //   try {
    //     //use the pdfMake library to create in memory pdf from the JSON
    //     pdfDoc.getDataUrl(function (outDoc) {
    //       deferred.resolve(outDoc);
    //     });
    //   } catch (e) {
    //     deferred.reject(e);
    //   }

    //   return deferred.promise;
    // }
    //
    // 4.GenerateReportBlob: buffer --> new Blob object
    // in: buffer[]   out: Blob object
    //
    // function generateReportBlob (buffer) {
    //   //use the global Blob object from pdfmake lib to creat a blob for file processing
    //   var deferred = $q.defer();
    //   try {
    //     //process the input buffer as an application/pdf Blob object for file processing
    //     var pdfBlob = new Blob([buffer], {
    //       type: 'application/pdf'
    //     });
    //     $timeout(function () {
    //       deferred.resolve(pdfBlob);
    //     }, 100);
    //   } catch (e) {
    //     deferred.reject(e);
    //   }

    //   return deferred.promise;
    // }
    //
    // 5.SaveFile: use the File plugin to save the pdfBlob and return a filePath to the client
    //
    // function saveFile (pdfBlob) {
    //   var deferred = $q.defer();

    //   var filePath = '';
    //   try {
    //     // console.log('SaveFile: requestFileSystem');
    //     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    //   } catch (e) {
    //     // console.error('SaveFile_Err: ' + e.message);
    //     deferred.reject(e);
    //     throw ({
    //       code: -1401,
    //       message: 'unable to save report file'
    //     });
    //   }

    //   function gotFS (fileSystem) {
    //     // console.error('SaveFile: gotFS --> getFile');
    //     fileSystem.root.getFile('rptSample.pdf', {
    //       create: true,
    //       exclusive: false
    //     }, gotFileEntry, fail);
    //   }

    //   function gotFileEntry (fileEntry) {
    //     // console.error('SaveFile: gotFileEntry --> (filePath) --> createWriter');
    //     filePath = fileEntry.toURL();
    //     fileEntry.createWriter(gotFileWriter, fail);
    //   }

    //   function gotFileWriter (writer) {
    //     // console.error('SaveFile: gotFileWriter --> write --> onWriteEnd(resolve)');
    //     writer.onwriteend = function (evt) {
    //       $timeout(function () {
    //         deferred.resolve(filePath);
    //       }, 100);
    //     };
    //     writer.onerror = function (e) {
    //       // console.log('writer error: ' + e.toString());
    //       deferred.reject(e);
    //     };
    //     writer.write(pdfBlob);
    //   }

    //   function fail (error) {
    //     // console.log(error.code);
    //     deferred.reject(error);
    //   }

    //   return deferred.promise;
    // }
    //
    // Loading UI Functions: utility functions to show/hide loading UI
    //
    // function showLoading (msg) {
    //   $rootScope.$broadcast('ReportSvc::Progress', msg);
    // }
    // function hideLoading () {
    //   $rootScope.$broadcast('ReportSvc::Done');
    // }
  }

})();

//
// Report Service
//
// This service provides a dummy document definition for the purpose of this sample.  In
// my real world usage, I split documentDef creation from the reportPDF creation.  The RptBuilderSvc
// is used to receive inputs and return a JSON object w/ the report declarations.  This mock svc
// just creates some random progress matrix and draws a table to display.  The pdfMake.org site
// has a nice playground for drafting your report pieces.  My plan is to share the ionic-pdf
// so users can incorporate PDF generation and focus on creating their docDefs and using ionic-pdf
// to easily render
'use strict';
(function () {

  // attach the factories and service to the [starter.services] module in angular
  angular.module('app.core')
    .service('ReportBuilderSvc', reportBuilderService);

  function reportBuilderService () {
    var self = this;

    self.generateReport = _generateReport;
    function _generateReport () {
      //create an array of progress for the (6) categories presented
      var completions = [(Math.random() * 100).toFixed(1),
        (Math.random() * 100).toFixed(1),
        (Math.random() * 100).toFixed(1),
        (Math.random() * 100).toFixed(1),
        (Math.random() * 100).toFixed(1),
        (Math.random() * 100).toFixed(1)];
      //use this array for each row bar, and return the document declaration object
      // plz see the pdfMake.org site for examples of document definitions
      return {
        content: [
          {
            text: 'Categorical CoreCheck Analysis',
            style: 'subheader',
            margin: [0, 12, 0, 0]
          },
          {
            canvas: [{
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 500,
              y2: 0
            }],
            margin: [0, 4, 0, 12]
          },
          {
            table: {
              headers: 1,
              widths: [400, 75],
              body: [
                [{
                  text: 'Core Check Category',
                  style: 'tableHeader'
                },
                {
                  text: 'Completion',
                  style: 'tableHeader'
                }],
                [['English Requirement', {
                  canvas: [{
                    type: 'rect',
                    x: -2,
                    y: -16,
                    w: 4 * completions[0],
                    h: 20,
                    color: '#09b'
                  }]
                }
                ], {
                  text: completions[0] + '%',
                  alignment: 'center'
                }],
                [['Math Requirement', {
                  canvas: [{
                    type: 'rect',
                    x: -2,
                    y: -16,
                    w: 4 * completions[1],
                    h: 20,
                    color: '#069'
                  }]
                }
                ], {
                  text: completions[1] + '%',
                  alignment: 'center'
                }],
                [['Science Requirement', {
                  canvas: [{
                    type: 'rect',
                    x: -2,
                    y: -16,
                    w: 4 * completions[2],
                    h: 20,
                    color: '#09b'
                  }]
                }
                ], {
                  text: completions[2] + '%',
                  alignment: 'center'
                }],
                [['Additional Core Requirement', {
                  canvas: [{
                    type: 'rect',
                    x: -2,
                    y: -16,
                    w: 4 * completions[3],
                    h: 20,
                    color: '#069'
                  }]
                }
                ], {
                  text: completions[3] + '%',
                  alignment: 'center'
                }],
                [['Social Science Requirement', {
                  canvas: [{
                    type: 'rect',
                    x: -2,
                    y: -16,
                    w: 4 * completions[4],
                    h: 20,
                    color: '#09b'
                  }]
                }
                ], {
                  text: completions[4] + '%',
                  alignment: 'center'
                }],
                [['Elective Requirement', {
                  canvas: [{
                    type: 'rect',
                    x: -2,
                    y: -16,
                    w: 4 * completions[5],
                    h: 20,
                    color: '#069'
                  }]
                }
                ], {
                  text: completions[5] + '%',
                  alignment: 'center'
                }]
              ]
            },
            pageBreak: 'after'
          }]
      };
    }
  }
})();

// 'use strict';
// angular.module('app.core').factory('InvoiceService', ['$q']);

// 'use strict';
// angular.module('app.core').factory('InvoiceService', ['$q', InvoiceService]);

// function InvoiceService ($q) {
//   function createPdf (invoice) {
//     return $q(function (resolve, reject) {
//       var dd = createDocumentDefinition(invoice);
//       var pdf = pdfMake.createPdf(dd);
//       pdf.getBase64(function (output) {
//         resolve(base64ToUint8Array(output));
//       });
//     });
//   }

//   return {
//     createPdf: createPdf
//   };
// }

// function base64ToUint8Array (base64) {
//   var raw = atob(base64);
//   var uint8Array = new Uint8Array(raw.length);
//   for (var i = 0; i < raw.length; i++) {
//     uint8Array[i] = raw.charCodeAt(i);
//   }
//   return uint8Array;
// }

// function createDocumentDefinition (invoice) {

//   var items = invoice.Items.map(function (item) {
//     return [item.Description, item.Quantity, item.Price];
//   });

//   var dd = {
//     content: [
//       {
//         text: 'INVOICE',
//         style: 'header'
//       },
//       {
//         text: invoice.Date,
//         alignment: 'right'
//       },

//       {
//         text: 'From',
//         style: 'subheader'
//       },
//       invoice.AddressFrom.Name,
//       invoice.AddressFrom.Address,
//       invoice.AddressFrom.Country,

//       {
//         text: 'To',
//         style: 'subheader'
//       },
//       invoice.AddressTo.Name,
//       invoice.AddressTo.Address,
//       invoice.AddressTo.Country,

//       {
//         text: 'Items',
//         style: 'subheader'
//       },
//       {
//         style: 'itemsTable',
//         table: {
//           widths: ['*', 75, 75],
//           body: [
//             [
//               {
//                 text: 'Description',
//                 style: 'itemsTableHeader'
//               },
//               {
//                 text: 'Quantity',
//                 style: 'itemsTableHeader'
//               },
//               {
//                 text: 'Price',
//                 style: 'itemsTableHeader'
//               },
//             ]
//           ].concat(items)
//         }
//       },
//       {
//         style: 'totalsTable',
//         table: {
//           widths: ['*', 75, 75],
//           body: [
//             [
//               '',
//               'Subtotal',
//               invoice.Subtotal,
//             ],
//             [
//               '',
//               'Shipping',
//               invoice.Shipping,
//             ],
//             [
//               '',
//               'Total',
//               invoice.Total,
//             ]
//           ]
//         },
//         layout: 'noBorders'
//       },
//     ],
//     styles: {
//       header: {
//         fontSize: 20,
//         bold: true,
//         margin: [0, 0, 0, 10],
//         alignment: 'right'
//       },
//       subheader: {
//         fontSize: 16,
//         bold: true,
//         margin: [0, 20, 0, 5]
//       },
//       itemsTable: {
//         margin: [0, 5, 0, 15]
//       },
//       itemsTableHeader: {
//         bold: true,
//         fontSize: 13,
//         color: 'black'
//       },
//       totalsTable: {
//         bold: true,
//         margin: [0, 30, 0, 0]
//       }
//     },
//     defaultStyle: {
//     }
//   };

//   return dd;
// }

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

'use strict';
angular.module('app.core')
  .factory('myModalService', function (appModalService) {
    // all app modals here
    var service = {
      showLogin: showLogin,
      showRegistration: showRegistration,
      showPledgeDetails: showPledgeDetails,
      showVoteModal: showVoteModal,
      showSizeModal: showSizeModal,
      showSizeGuide: showSizeGuide,
      showRBP: showRBP,
      showFAQ: showFAQ
    };

    return service;

    function showLogin () {
      return appModalService.show('modules/account/account.login/views/account.login.html', 'loginCtrl as ctrl');
    }

    function showRegistration () {
      return appModalService.show('modules/account/account.register/views/account.register.html', 'registerCtrl as ctrl');
    }

    function showPledgeDetails (pledge) {
      return appModalService.show('modules/pledge/pledge.details/views/pledge.details.html', 'pledgeDetailsCtrl as ctrl', pledge);
    }

    function showVoteModal (pledge) {
      return appModalService.show('modules/pledge/pledge.vote/views/pledge.vote.html', 'voteCtrl as ctrl', pledge);
    }

    function showSizeModal () {

    }

    function showSizeGuide (pledge) {
      return appModalService.show('modules/pledge/pledge.sizeguide/views/pledge.sizeguide.html', 'sizeGuideCtrl as ctrl', pledge);
    }

    function showRBP () {

    }

    function showFAQ () {

    }
  });

'use strict';
angular.module('app.core')
  .factory('appModalService', function ($ionicModal, $rootScope, $q, $injector, $controller) {

    return {
      show: show
    };

    function show (templeteUrl, controller, parameters, options) {
      // Grab the injector and create a new scope
      var deferred = $q.defer();
      var ctrlInstance;
      var modalScope = $rootScope.$new();
      var thisScopeId = modalScope.$id;
      var defaultOptions = {
        animation: 'slide-in-up',
        focusFirstInput: false,
        backdropClickToClose: true,
        hardwareBackButtonClose: true,
        modalCallback: null
      };

      options = angular.extend({}, defaultOptions, options);

      $ionicModal.fromTemplateUrl(templeteUrl, {
        scope: modalScope,
        animation: options.animation,
        focusFirstInput: options.focusFirstInput,
        backdropClickToClose: options.backdropClickToClose,
        hardwareBackButtonClose: options.hardwareBackButtonClose
      }).then(function (modal) {
        modalScope.modal = modal;

        modalScope.openModal = function () {
          modalScope.modal.show();
        };
        modalScope.closeModal = function (result) {
          deferred.resolve(result);
          modalScope.modal.hide();
        };
        modalScope.$on('modal.hidden', function (thisModal) {
          if (thisModal.currentScope) {
            var modalScopeId = thisModal.currentScope.$id;
            if (thisScopeId === modalScopeId) {
              deferred.resolve(null);
              _cleanup(thisModal.currentScope);
            }
          }
        });

        // Invoke the controller
        var locals = {
          '$scope': modalScope,
          'parameters': parameters
        };
        var ctrlEval = _evalController(controller);
        ctrlInstance = $controller(controller, locals);
        if (ctrlEval.isControllerAs) {
          ctrlInstance.openModal = modalScope.openModal;
          ctrlInstance.closeModal = modalScope.closeModal;
        }

        modalScope.modal.show()
          .then(function () {
            modalScope.$broadcast('modal.afterShow', modalScope.modal);
          });

        if (angular.isFunction(options.modalCallback)) {
          options.modalCallback(modal);
        }

      }, function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }

    function _cleanup (scope) {
      scope.$destroy();
      if (scope.modal) {
        scope.modal.remove();
      }
    }

    function _evalController (ctrlName) {
      var result = {
        isControllerAs: false,
        controllerName: '',
        propName: ''
      };
      var fragments = (ctrlName || '').trim().split(/\s+/);
      result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
      if (result.isControllerAs) {
        result.controllerName = fragments[0];
        result.propName = fragments[2];
      } else {
        result.controllerName = ctrlName;
      }

      return result;
    }

  });

'use strict';
angular.module('app.core')
.service('Main', function ($log, $timeout) {

  $log.log('Hello from your Service: Main in module main');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  this.changeBriefly = function () {
    var initialValue = this.someData.binding;
    this.someData.binding = 'Yeah this was changed';

    var that = this;
    $timeout(function () {
      that.someData.binding = initialValue;
    }, 500);
  };

});

'use strict';
angular.module('app.core')
  .run(function ($rootScope, $ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        window.cordova.plugins.Keyboard.disableScroll(true);
      }
    });
  });

'use strict';
angular.module('app.core')
.controller('mainCtrl', function (utilService) {
  var vm = this;

  vm.go = function (param1, param2) {
    utilService.go(param1, param2);
  };
});

'use strict';
angular.module('app.core')
    .config(function ($translateProvider, $ionicConfigProvider, $mdGestureProvider, $httpProvider) {
      $mdGestureProvider.skipClickHijack();
        // angular-translate configuration
      $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '{part}/i18n/{lang}.json'
      });
      $translateProvider.preferredLanguage('en');
      $translateProvider.useSanitizeValueStrategy('sanitize');
      $ionicConfigProvider.tabs.position('bottom');
      $httpProvider.defaults.withCredentials = true;
    });

'use strict';
angular.module('app.core')
  .directive('progressBar', function () {
    return {
      restrict: 'E',
      replace: 'true',
      template: '<div class="progress-wrap progress"><div class="progress-bar progress"></div></div>',
      link: function (scope, elem, attrs) {
        var getPercent = attrs.progress;
        var progressbar = elem.children();

        progressbar.css('left', getPercent + '%');

      }
    };
  });

'use strict';
angular.module('app.core')
.controller('DebugCtrl', function ($log, Main, Config, $cordovaDevice) {

  $log.log('Hello from your Controller: DebugCtrl in module main:. This is your controller:', this);

  // bind data from services
  this.someData = Main.someData;
  this.ENV = Config.ENV;
  this.BUILD = Config.BUILD;
  // get device info
  ionic.Platform.ready(function () {
    if (ionic.Platform.isWebView()) {
      this.device = $cordovaDevice.getDevice();
    }
  }.bind(this));

  // PASSWORD EXAMPLE
  this.password = {
    input: '', // by user
    strength: ''
  };
  this.grade = function () {
    var size = this.password.input.length;
    if (size > 8) {
      this.password.strength = 'strong';
    } else if (size > 3) {
      this.password.strength = 'medium';
    } else {
      this.password.strength = 'weak';
    }
  };
  this.grade();

});


'use strict';
angular.module('app.core')
  .constant('AppSettings', {
    // API_URL: 'http://moe.meteor.com/api',
    // API_URL: 'http://localhost:3010/api',
    API_URL: 'http://mobile2.moe.gov.my/api'
  });

'use strict';
angular.module('moeSBP', [
  // load your modules here
  'app.core',
  'home',
  'account',
]);
