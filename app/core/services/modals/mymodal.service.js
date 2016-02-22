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
