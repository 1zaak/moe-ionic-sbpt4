'use strict';
angular.module('home.resources')
  .controller('homeResourcesCtrl', function($scope, $ionicModal, utilService, dataHelper, ReportSvc) {
    var vm = this;

    // function getDummyData() {
    //   return {
    //     Date: new Date().toLocaleDateString("en-IE", {
    //       year: "numeric",
    //       month: "long",
    //       day: "numeric"
    //     }),
    //     AddressFrom: {
    //       Name: chance.name(),
    //       Address: chance.address(),
    //       Country: chance.country({
    //         full: true
    //       })
    //     },
    //     AddressTo: {
    //       Name: chance.name(),
    //       Address: chance.address(),
    //       Country: chance.country({
    //         full: true
    //       })
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

    // function setDefaultsForPdfViewer($scope) {
    //   $scope.scroll = 0;
    //   $scope.loading = 'loading';

    //   $scope.onError = function(error) {
    //     console.error(error);
    //   };

    //   $scope.onLoad = function() {
    //     $scope.loading = '';
    //   };

    //   $scope.onProgress = function(progress) {
    //     console.log(progress);
    //   };
    // }

    // setDefaultsForPdfViewer($scope);

    // // Initialize the modal view.
    // $ionicModal.fromTemplateUrl('/modules/home/home.resources/views/pdf-home.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function(modal) {
    //   vm.modal = modal;
    // });

    // vm.createInvoice = function() {
    //   var invoice = getDummyData();

    //   InvoiceService.createPdf(invoice)
    //     .then(function(pdf) {
    //       var blob = new Blob([pdf], {
    //         type: 'application/pdf'
    //       });
    //       $scope.pdfUrl = URL.createObjectURL(blob);

    //       // Display the modal view
    //       vm.modal.show();
    //     });
    // };

    
    // // Clean up the modal view.
    // $scope.$on('$destroy', function() {
    //   vm.modal.remove();
    // });




  });
