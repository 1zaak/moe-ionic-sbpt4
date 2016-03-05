'use strict';
angular.module('home.semakan')
  .controller('homeSemakanCtrl', function($scope, utilService, dataHelper, $mdDialog, $mdMedia) {
    var vm = this;

    utilService.getModal($scope, 'modules/home/home.semakan/views/semakan-modal.html', 'slide-in-up')
      .then(function(modal) {
        vm.semakanModal = modal;
      });

    utilService.getModal($scope, 'modules/home/home.semakan/views/rayuan-berjaya-modal.html', 'slide-in-up')
      .then(function(modal) {
        vm.rayuanBerjayaModal = modal;
      });
    vm.setuju = true;

    var refreshData = function() {
      vm.agiliran = undefined;
      vm.mykad = undefined;
      vm.isLoading = false;
      vm.sbp = undefined;
      vm.calon = undefined;
      vm.statusSemakan = 'Semak';
    };

    refreshData();

    vm.hapus = function() {
      refreshData();
    };

    vm.uppercase = function() {
      vm.agiliran = vm.agiliran.toUpperCase().trim();
    };

    var getSst4 = function(value) {
      vm.statusSemakan = undefined;
      vm.isLoading = true;
      dataHelper.getSst4(value)
        .then(function(data) {
          vm.peribadi = data;
          vm.isLoading = false;
          vm.statusSemakan = 'Calon berjaya';
          vm.semakanModal.show();
        }, function(data) {
          vm.peribadi = data;
          vm.isLoading = false;
          vm.statusSemakan = 'Server tiada respons';
          if (data !== undefined && data !== null) {
            vm.semakanModal.show();
          } else if (data !== undefined && data === null) {
            vm.statusSemakan = 'Server tiada respons';
          }

        });
    };

    vm.semak = function() {
      if (vm.agiliran !== undefined && vm.mykad !== undefined) {
        var query = vm.agiliran + '/' + vm.mykad;
        getSst4(query);
      } else {
        vm.statusSemakan = 'Sila masukkan data..';
      }
    };

    var postTawaran = function(url, value) {
      value = JSON.stringify(value);
      console.log(url, value);
      dataHelper.postTawaran(url, value)
        .then(function(data) {
          return data;
          console.log(data);
        }, function(data) {
          return data;
          console.log(data);
        });

    };

    vm.hantar = function() {      
        var url = vm.peribadi.agiliran;
        var data = {
          SETUJU_TERIMA: vm.setuju,
          TKH_SETUJU_TERIMA: Date()
        };
        console.log(data);
        postTawaran(url, data);
        utilService.go('home.resources');
        vm.semakanModal.hide();

    };

    // var getCalon = function(value) {

    //   dataHelper.getCalon(value)
    //     .then(function(data) {


    //       vm.calon = {
    //         status: data.status,
    //         agiliran: data.AGILIRAN,
    //         sekolah: data.sekolah,
    //         IC: data.IC,
    //         NAMAC: data.NAMAC,
    //         TLAHIR3: data.TLAHIR3,
    //         JANTINA: data.JANTINA,
    //         JENISSBP: data.JENISSBP,
    //         KKET: data.KKET,
    //         KAGAMA: data.KAGAMA,
    //         KCACAT: data.KCACAT,
    //         KPEKER: data.KPEKER,
    //         KPEND: data.KPEND,
    //         KODSEK: data.KODSEK,
    //         GJAWI: data.GJAWI,
    //         GQUR: data.GQUR,
    //         KODBIL: data.KODBIL,
    //         KODNEG: data.KODNEG,
    //         STATPEL: data.STATPEL,
    //         NOPUSAT: data.NOPUSAT,
    //         JUM1: data.JUM1,
    //         GRED4: data.GRED4,
    //         LAYAK: data.LAYAK,
    //         STATUS: data.STATUS,
    //         TAWARAN: data.TAWARAN,
    //         TEMPAT: data.TEMPAT,
    //         KODSIRI: data.KODSIRI,
    //         NAMA: data.NAMA,
    //         TRKTAWAR: data.TRKTAWAR,
    //         NOKP_BAPA: data.NOKP_BAPA,
    //         NOKP_IBU: data.NOKP_IBU,
    //         ALAMAT1: data.ALAMAT1,
    //         ALAMAT2: data.ALAMAT2,
    //         ALAMAT3: data.ALAMAT3,
    //         POSKOD: data.POSKOD,
    //         NEG_ALAMAT: data.NEG_ALAMAT,
    //         BANDAR: data.BANDAR,
    //         NO_TAWARAN: data.NO_TAWARAN,
    //         NO_KPT: data.NO_KPT,
    //         PENGESAHAN_TAWARAN: data.PENGESAHAN_TAWARAN,
    //         MARA: data.MARA,
    //         SETUJU_TERIMA: data.SETUJU_TERIMA,
    //         TKH_SETUJU_TERIMA: data.TKH_SETUJU_TERIMA,
    //         CETAK: data.CETAK,
    //         type: data.type
    //       };

    //     }, function(data) {
    //       vm.calon = {
    //         status: data.status,
    //       };
    //     });

    // };
    // vm.openModal = function () {
    //   semak();
    //   if (vm.calon !== undefined) {
    //     vm.semakanModal.show();

    //   } else {


    //     vm.semakanModal.hide();
    //   }
    // };


    // var correctIC = function () {
    //   var kpBapa = vm.calon.NOKP_BAPA;
    //   var kpIbu = vm.calon.NOKP_IBU;
    //   var inputKP = vm.calon.kpPenjaga;

    //   if (kpBapa === inputKP) {
    //     return true;
    //   } else if (kpIbu === inputKP) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    // var formatIC = function () {
    //   var kpBapa = vm.calon.NOKP_BAPA;
    //   var kpIbu = vm.calon.NOKP_IBU;
    //   var inputKP = vm.calon.kpPenjaga;

    //   if (kpBapa === inputKP) {
    //     return false;
    //   } else if (kpIbu === inputKP) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // };


    vm.closeSemak = function() {

      vm.semakanModal.hide();
      refreshData();
    };

    vm.closeRayuanBerjaya = function() {
      vm.semakanModal.hide();
      vm.rayuanBerjayaModal.hide();
      refreshData();
    };

    vm.kembali = function() {

      vm.semakanModal.hide();
      refreshData();
    };
    $scope.$on('$destroy', function() {
      vm.semakanModal.remove();
    });
  });
