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
