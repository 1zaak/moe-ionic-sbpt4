'use strict';
angular.module('home.tidak-setuju')
  .controller('homeTidakSetujuCtrl', function ($scope, utilService, dataHelper, $stateParams) {
    var vm = this;

    vm.peribadi = $stateParams;

  });
