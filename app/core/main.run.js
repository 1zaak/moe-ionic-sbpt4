'use strict';
angular.module('app.core')
    .run(function ($rootScope, $ionicPlatform) {
        
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                window.cordova.plugins.Keyboard.disableScroll(true);
            }
        });
    });
