'use strict';
angular.module('home.resources')
  .controller('homeResourcesCtrl', function($scope, $ionicModal, utilService, dataHelper, ReportSvc, InvoiceService) {
    var vm = this;

    //$scope.runReport = _runReport;
    $scope.clearReport = _clearReport;
    console.log(_clearReport);
    _activate();
    
    function _activate() {        
//
// ReportSvc Event Listeners: Progress/Done
//    used to listen for async progress updates so loading text can change in 
//    UI to be repsonsive because the report process can be 'lengthy' on 
//    older devices (chk reportSvc for emitting events)
//
		$scope.$on('ReportSvc::Progress', function(event, msg) {
			_showLoading(msg);
		});		 
		$scope.$on('ReportSvc::Done', function(event, err) {
			_hideLoading();
		});        
    }
    
    function _runReport() {
        //if no cordova, then running in browser and need to use dataURL and iframe
        if (!window.cordova) {
        	console.log("Window is not cordova");
            ReportSvc.runReportDataURL( {},{} )
                .then(function(dataURL) {
                    //set the iframe source to the dataURL created
                    console.log('report run in browser using dataURL and iframe');
                    document.getElementById('pdfImage').src = dataURL;
                });
            return true;
        }
        //if codrova, then running in device/emulator and able to save file and open w/ InAppBrowser
        else {
            ReportSvc.runReportAsync( {},{} )
                .then(function(filePath) {
                    //log the file location for debugging and oopen with inappbrowser
                    console.log('report run on device using File plugin');
                    console.log('ReportCtrl: Opening PDF File (' + filePath + ')');
                    window.open(filePath, '_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
                    hideLoading();
                });
            return true;
        }
	}

    //reset the iframe to show the empty html page from app start
    function _clearReport() {
        document.getElementById('pdfImage').src = "modules/home/home.resources/view/empty.html";
    }
//
// Loading UI Functions: utility functions to show/hide loading UI
//
    function _showLoading(msg) {
        $ionicLoading.show({
          template: msg
        });
    }
    function _hideLoading(){
        $ionicLoading.hide();
    }


    //pdf.js
    function getDummyData() {
      return {
        Date: new Date().toLocaleDateString("en-IE", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        AddressFrom: {
          Name: chance.name(),
          Address: chance.address(),
          Country: chance.country({
            full: true
          })
        },
        AddressTo: {
          Name: chance.name(),
          Address: chance.address(),
          Country: chance.country({
            full: true
          })
        },
        Items: [
          {
            Description: 'iPhone 6S',
            Quantity: '1',
            Price: '€700'
          },
          {
            Description: 'Samsung Galaxy S6',
            Quantity: '2',
            Price: '€655'
          }
        ],
        Subtotal: '€2010',
        Shipping: '€6',
        Total: '€2016'
      };
    }

    function setDefaultsForPdfViewer($scope) {
      $scope.scroll = 0;
      $scope.loading = 'loading';

      $scope.onError = function(error) {
        console.error(error);
      };

      $scope.onLoad = function() {
        $scope.loading = '';
      };

      $scope.onProgress = function(progress) {
        console.log(progress);
      };
    }

    setDefaultsForPdfViewer($scope);

    // Initialize the modal view.
    $ionicModal.fromTemplateUrl('/modules/home/home.resources/views/pdf-home.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      vm.modal = modal;
    });

    vm.createInvoice = function() {
      var invoice = getDummyData();

      InvoiceService.createPdf(invoice)
        .then(function(pdf) {
          var blob = new Blob([pdf], {
            type: 'application/pdf'
          });
          $scope.pdfUrl = URL.createObjectURL(blob);

          // Display the modal view
          vm.modal.show();
        });
    };
    // Clean up the modal view.
    $scope.$on('$destroy', function() {
      vm.modal.remove();
    });
  });
