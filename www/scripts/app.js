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
  .controller('homeSemakanCtrl', function ($scope, utilService, dataHelper) {
    var vm = this;

    utilService.getModal($scope, 'modules/home/home.semakan/views/semakan-modal.html', 'slide-in-up')
      .then(function (modal) {
        vm.semakanModal = modal;
      });

    utilService.getModal($scope, 'modules/home/home.semakan/views/rayuan-berjaya-modal.html', 'slide-in-up')
      .then(function (modal) {
        vm.rayuanBerjayaModal = modal;
      });

    var refreshData = function () {
      vm.sbp = undefined;
      vm.calon = undefined;
      vm.agiliran = undefined;
    };

    var getCalon = function (value) {

      dataHelper.getCalon(value)
        .then(function (data) {


          vm.calon = {
            status: data.status,
            agiliran: data.AGILIRAN,
            sekolah: data.sekolah,
            IC: data.IC,
            NAMAC: data.NAMAC,
            TLAHIR3: data.TLAHIR3,
            JANTINA: data.JANTINA,
            JENISSBP: data.JENISSBP,
            KKET: data.KKET,
            KAGAMA: data.KAGAMA,
            KCACAT: data.KCACAT,
            KPEKER: data.KPEKER,
            KPEND: data.KPEND,
            KODSEK: data.KODSEK,
            GJAWI: data.GJAWI,
            GQUR: data.GQUR,
            KODBIL: data.KODBIL,
            KODNEG: data.KODNEG,
            STATPEL: data.STATPEL,
            NOPUSAT: data.NOPUSAT,
            JUM1: data.JUM1,
            GRED4: data.GRED4,
            LAYAK: data.LAYAK,
            STATUS: data.STATUS,
            TAWARAN: data.TAWARAN,
            TEMPAT: data.TEMPAT,
            KODSIRI: data.KODSIRI,
            NAMA: data.NAMA,
            TRKTAWAR: data.TRKTAWAR,
            NOKP_BAPA: data.NOKP_BAPA,
            NOKP_IBU: data.NOKP_IBU,
            ALAMAT1: data.ALAMAT1,
            ALAMAT2: data.ALAMAT2,
            ALAMAT3: data.ALAMAT3,
            POSKOD: data.POSKOD,
            NEG_ALAMAT: data.NEG_ALAMAT,
            BANDAR: data.BANDAR,
            NO_TAWARAN: data.NO_TAWARAN,
            NO_KPT: data.NO_KPT,
            PENGESAHAN_TAWARAN: data.PENGESAHAN_TAWARAN,
            MARA: data.MARA,
            SETUJU_TERIMA: data.SETUJU_TERIMA,
            TKH_SETUJU_TERIMA: data.TKH_SETUJU_TERIMA,
            CETAK: data.CETAK,
            type: data.type
          };

        }, function (data) {
          vm.calon = {
            status: data.status,
          };
        });

    };

    vm.hapus = function () {
      vm.agiliran = undefined;
    };


    vm.semak = function () {

      vm.agiliran = vm.agiliran.toUpperCase().trim();

      getCalon(vm.agiliran);

    };

    vm.openModal = function () {
      if (vm.calon !== undefined) {
        vm.semakanModal.show();
      } else {
        vm.semakanModal.hide();
      }
    };


    vm.correctIC = function () {
      var kpBapa = vm.calon.NOKP_BAPA;
      var kpIbu = vm.calon.NOKP_IBU;
      var inputKP = vm.calon.kpPenjaga;

      if (kpBapa === inputKP) {
        return true;
      } else if (kpIbu === inputKP) {
        return true;
      } else {
        return false;
      }
    };

    vm.formatIC = function () {
      var kpBapa = vm.calon.NOKP_BAPA;
      var kpIbu = vm.calon.NOKP_IBU;
      var inputKP = vm.calon.kpPenjaga;

      if (kpBapa === inputKP) {
        return false;
      } else if (kpIbu === inputKP) {
        return false;
      } else {
        return true;
      }
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

    var getSbp = function (value) {
      dataHelper.getSbp(value)
        .then(function (data) {


          vm.sbp = {
            status: data.status,
            KODSBP: data.KODSBP,
            KODRINGKAS: data.KODRINGKAS,
            NAMASBP: data.NAMASBP,
            ALAMAT1: data.ALAMAT1,
            ALAMAT2: data.ALAMAT2,
            BANDAR: data.BANDAR,
            POSKOD: data.POSKOD,
            NEGERI: data.NEGERI,
            NOTEL: data.NOTEL,
            KODSEKOLAH: data.KODSEKOLAH,
            PASSWORD: data.PASSWORD,
            KAPASITI: data.KAPASITI,
            KAPASITI_L: data.KAPASITI_L,
            KAPASITI_P: data.KAPASITI_P,
            IDSEKOLAH: data.IDSEKOLAH
          };
        }, function (data) {
          vm.sbp = {
            status: data.status,
          };
        });
    };

    vm.getSbp = function () {
      var query = vm.calon.agiliran + '/' + vm.calon.kpPenjaga;
      getSbp(query);
    };

    vm.hantar = function () {

      var kpBapa = vm.calon.NOKP_BAPA;
      var kpIbu = vm.calon.NOKP_IBU;
      var inputKP = vm.calon.kpPenjaga;

      if (kpBapa === inputKP) {
        vm.rayuanBerjayaModal.show();
      } else if (kpIbu === inputKP) {
        vm.rayuanBerjayaModal.show();
      } else {
        vm.calon.kpPenjaga = '';
      }

      vm.agiliran = undefined;
    };

    vm.kembali = function () {

      vm.semakanModal.hide();
      vm.agiliran = undefined;
    };
    $scope.$on('$destroy', function () {
      vm.semakanModal.remove();
    });
  });

'use strict';
angular.module('home', [
  'home.semakan',
  'home.history',
]);

'use strict';
angular.module('home.history', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.history', {
        url: '/history',
        views: {
          'tab-history@home': {
            templateUrl: 'modules/home/home.history/views/home-history.html'
          }
        },
        data: {
          isSecured: false
        }
      });
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
  'ionic-modal-select'
        // TODO: load other modules selected during generation
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
    .config(function ($translateProvider, $ionicConfigProvider, $mdGestureProvider) {
      $mdGestureProvider.skipClickHijack();
        // angular-translate configuration
      $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '{part}/i18n/{lang}.json'
      });
      $translateProvider.preferredLanguage('en');
      $translateProvider.useSanitizeValueStrategy('sanitize');

      $ionicConfigProvider.tabs.position('bottom');

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
    API_URL: 'http://moe.meteor.com/api',
  // API_URL: 'http://localhost:3010/api',
  });

'use strict';
angular.module('moeSBP', [
  // load your modules here
  'app.core',
  'home',
  'account'
]);
