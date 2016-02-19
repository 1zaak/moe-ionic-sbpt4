'use strict';
angular.module('app.test', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider.state('app.test', {
            url: '/test',
            views: {
                'tab-test': {
                    templateUrl: 'test/views/index.html'
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('test');
    });

'use strict';
angular.module('app.pledge.home', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider
            .state('app.pledge.home', {
                url: '/home',
                views: {
                    'content@app.pledge': {
                        templateUrl: 'modules/pledge/pledge.home/views/pledge.home.html',
                        controller: 'pledgeHomeCtrl as ctrl'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('modules/pledge/pledge.home');
    });

'use strict';
angular.module('app.pledge.home')
    .controller('voteCtrl', function ($scope, AppSettings) {

        var vm = this;
        vm.cdn = AppSettings.CDN;
        vm.votevalue = 2;

        vm.close = function () {
            $scope.closeModal(null);
        };

        vm.vote = function () {
            $scope.closeModal(vm.votevalue);
        };
    });

'use strict';
angular.module('app.pledge.home')
    .controller('sizeGuideCtrl', function ($scope, AppSettings) {

        var vm = this;
        vm.cdn = AppSettings.CDN;

        vm.close = function () {
            $scope.closeModal(null);
        };
    });

'use strict';
angular.module('app.pledge', [
        'app.pledge.home'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.pledge', {
                url: '/pledge',
                abstract: true,
                views: {
                    'tab-pledge@app': {
                        templateUrl: 'modules/pledge/layout/layout.html'
                    }
                }
            });
    });

'use strict';
angular.module('app.pledge.home')
    .controller('pledgeHomeCtrl', function (AppSettings, myModalService) {
        var vm = this;
        vm.cdn = AppSettings.CDN;

        vm.showPledgeDetails = function (pledge) {
            myModalService.showPledgeDetails(pledge);
        };

        vm.showVoteModal = function (pledge) {
            myModalService.showVoteModal(pledge);
        };
    });

'use strict';
angular.module('app.pledge.home')
    .controller('pledgeDetailsCtrl', function ($scope, AppSettings, myModalService) {

        var vm = this;
        vm.cdn = AppSettings.CDN;

        vm.availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];


        vm.showSizeGuide = function (pledge) {
            myModalService.showSizeGuide(pledge);
        };

        vm.close = function () {
            $scope.closeModal(null);
        };
    });

'use strict';
angular.module('app.home', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider.state('app.home', {
            url: '/home',
            views: {
                'tab-home@app': {
                    templateUrl: 'modules/home/views/index.html'
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('modules/home');
    });

'use strict';
angular.module('app.discover.shopping', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider
            .state('app.discover.shopping', {
                url: '/shopping',
                views: {
                    'content@app.discover': {
                        templateUrl: 'modules/discover/discover.shopping/views/discover.shopping.html'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('modules/discover/discover.shopping');
    });

'use strict';
angular.module('app.discover.pledge', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider
            .state('app.discover.pledge', {
                url: '/pledge',
                views: {
                    'content@app.discover': {
                        templateUrl: 'modules/discover/discover.pledge/views/discover.pledge.html'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('modules/discover/discover.pledge');
    });

'use strict';
angular.module('app.discover', [
        'app.discover.home',
        'app.discover.pledge',
        'app.discover.designer',
        'app.discover.shopping',
        'app.discover.design'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.discover', {
                url: '/discover',
                abstract: true,
                views: {
                    'tab-discover@app': {
                        templateUrl: 'modules/discover/layout/layout.html'
                    }
                }
            });
    });

'use strict';
angular.module('app.discover.home', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider
            .state('app.discover.home', {
                url: '/home',
                views: {
                    'content@app.discover': {
                        templateUrl: 'modules/discover/discover.home/views/discover.home.html'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('modules/discover/discover.home');
    });

'use strict';
angular.module('app.discover.designer', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider
            .state('app.discover.designer', {
                url: '/designer',
                views: {
                    'content@app.discover': {
                        templateUrl: 'modules/discover/discover.designer/views/discover.designer.html'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('modules/discover/discover.designer');
    });

'use strict';
angular.module('app.discover.design', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider
            .state('app.discover.design', {
                url: '/design',
                views: {
                    'content@app.discover': {
                        templateUrl: 'modules/discover/discover.design/views/discover.design.html'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('modules/discover/discover.design');
    });


'use strict';
angular.module('app.account', [
        'app.account.home',
        // 'app.discover.pledge',
        // 'app.discover.designer',
        // 'app.discover.shopping',
        // 'app.discover.design'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.account', {
                url: '/account',
                abstract: true,
                views: {
                    'tab-account@app': {
                        templateUrl: 'modules/account/layout/layout.html'
                    }
                }
            });
    });

'use strict';
angular.module('app.account.home', [])
    .config(function ($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider
            .state('app.account.home', {
                url: '/home',
                views: {
                    'content@app.account': {
                        templateUrl: 'modules/account/account.home/views/account.home.html',
                        controller: 'accountHomeCtrl as ctrl'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('modules/account/account.home');
    });

'use strict';
angular.module('app.account.home')
    .controller('accountHomeCtrl', function ($scope, utilService) {

        var vm = this;

        utilService.getModal($scope, 'modules/account/account.login/login.modal.html', 'slide-in-up')
        .then(function (modal) {
            vm.loginModal = modal;
        });

        utilService.getModal($scope, 'modules/account/account.register/register.modal.html', 'slide-in-up')
        .then(function (modal) {
            vm.registerModal = modal;
        });


        vm.login = function () {
            vm.loginModal.show();
        };

        vm.register = function () {
            vm.registerModal.show();
        };

        vm.closeLoginModal = function () {
            vm.loginModal.hide();
        };

        vm.closeRegisterModal = function () {
            vm.registerModal.hide();
        };


        $scope.$on('$destroy', function () {
            vm.loginModal.remove();
            vm.registerModal.remove();
        });
    });

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
        $urlRouterProvider.otherwise('/app/home');
        $stateProvider
        // this state is placed in the <ion-nav-view> in the index.html
            .state('app', {
            url: '/app',
            abstract: true,
            views: {
                'main@': {
                    templateUrl: 'core/layout/main-layout.html'
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

        function showLogin() {
            return appModalService.show('modules/account/account.login/views/account.login.html', 'loginCtrl as ctrl');
        }

        function showRegistration() {
            return appModalService.show('modules/account/account.register/views/account.register.html', 'registerCtrl as ctrl');
        }

        function showPledgeDetails(pledge) {
            return appModalService.show('modules/pledge/pledge.details/views/pledge.details.html', 'pledgeDetailsCtrl as ctrl', pledge);
        }

        function showVoteModal(pledge) {
            return appModalService.show('modules/pledge/pledge.vote/views/pledge.vote.html', 'voteCtrl as ctrl', pledge);
        }

        function showSizeModal() {

        }

        function showSizeGuide(pledge) {
            return appModalService.show('modules/pledge/pledge.sizeguide/views/pledge.sizeguide.html', 'sizeGuideCtrl as ctrl', pledge);
        }

        function showRBP() {

        }

        function showFAQ() {

        }
    });

'use strict';
angular.module('app.core')
    .factory('appModalService', function ($ionicModal, $rootScope, $q, $injector, $controller) {

        return {
            show: show
        };

        function show(templeteUrl, controller, parameters, options) {
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

        function _cleanup(scope) {
            scope.$destroy();
            if (scope.modal) {
                scope.modal.remove();
            }
        }

        function _evalController(ctrlName) {
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

  vm.go = function(param1, param2){
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
        APP_TITLE: 'Admin Center',
        CDN: 'http://cdn.ruizon.com.my/s3/hijab-royale-com'
    });

'use strict';
angular.module('myapp', [
  // load your modules here
  'app.core',
  'app.home',
  'app.discover',
  'app.pledge',
  'app.account'
]);
