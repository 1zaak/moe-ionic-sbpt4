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
