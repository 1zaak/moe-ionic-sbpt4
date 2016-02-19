'use strict';
angular.module('app.core')
.controller('mainCtrl', function (utilService) {
  var vm = this;

  vm.go = function(param1, param2){
    utilService.go(param1, param2);
  };
});
