'use strict';
angular.module('home.semakan')
  .controller('homeSemakanCtrl', function($scope, utilService, dataHelper) {
    var vm = this;

    utilService.getModal($scope, 'modules/home/home.semakan/views/semakan-modal.html', 'slide-in-up')
      .then(function(modal) {
        vm.semakanModal = modal;
      });

    utilService.getModal($scope, 'modules/home/home.semakan/views/rayuan-berjaya-modal.html', 'slide-in-up')
      .then(function(modal) {
        vm.rayuanBerjayaModal = modal;
      });

    var refreshData = function() {
      vm.sbp = undefined;
      vm.calon = undefined;
      vm.agiliran = undefined;
    };

    var getCalon = function(value) {

      dataHelper.getCalon(value)
        .then(function(data) {


          vm.calon = {
            status: data.status,
            agiliran: data.AGILIRAN,
            sekolah: data.sekolah,
            IC: data.IC,
            NAMAC: data.NAMAC,
            TLAHIR3: data.TLAHIR3,
            JANTINA: data.JANTINA,
            JENISSBP: data.JENISSBP,
            KKET: data.KKET,
            KAGAMA: data.KAGAMA,
            KCACAT: data.KCACAT,
            KPEKER: data.KPEKER,
            KPEND: data.KPEND,
            KODSEK: data.KODSEK,
            GJAWI: data.GJAWI,
            GQUR: data.GQUR,
            KODBIL: data.KODBIL,
            KODNEG: data.KODNEG,
            STATPEL: data.STATPEL,
            NOPUSAT: data.NOPUSAT,
            JUM1: data.JUM1,
            GRED4: data.GRED4,
            LAYAK: data.LAYAK,
            STATUS: data.STATUS,
            TAWARAN: data.TAWARAN,
            TEMPAT: data.TEMPAT,
            KODSIRI: data.KODSIRI,
            NAMA: data.NAMA,
            TRKTAWAR: data.TRKTAWAR,
            NOKP_BAPA: data.NOKP_BAPA,
            NOKP_IBU: data.NOKP_IBU,
            ALAMAT1: data.ALAMAT1,
            ALAMAT2: data.ALAMAT2,
            ALAMAT3: data.ALAMAT3,
            POSKOD: data.POSKOD,
            NEG_ALAMAT: data.NEG_ALAMAT,
            BANDAR: data.BANDAR,
            NO_TAWARAN: data.NO_TAWARAN,
            NO_KPT: data.NO_KPT,
            PENGESAHAN_TAWARAN: data.PENGESAHAN_TAWARAN,
            MARA: data.MARA,
            SETUJU_TERIMA: data.SETUJU_TERIMA,
            TKH_SETUJU_TERIMA: data.TKH_SETUJU_TERIMA,
            CETAK: data.CETAK,
            type: data.type
          };

        }, function(data) {
          vm.calon = {
            status: data.status,
          };
        });

    };

    vm.hapus = function() {
      vm.agiliran = undefined;
    };


    var semak = function() {

      vm.agiliran = vm.agiliran.toUpperCase().trim();

      getCalon(vm.agiliran);

    };

    vm.openModal = function() {
      semak();
      if (vm.calon !== undefined) {
        vm.semakanModal.show();
        vm.noData = undefined;
      } else {

        vm.noData = "Please try again";
        vm.semakanModal.hide();
      }
    };


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

    var getSbp = function(value) {
      dataHelper.getSbp(value)
        .then(function(data) {


          vm.sbp = {
            status: data.status,
            KODSBP: data.KODSBP,
            KODRINGKAS: data.KODRINGKAS,
            NAMASBP: data.NAMASBP,
            ALAMAT1: data.ALAMAT1,
            ALAMAT2: data.ALAMAT2,
            BANDAR: data.BANDAR,
            POSKOD: data.POSKOD,
            NEGERI: data.NEGERI,
            NOTEL: data.NOTEL,
            KODSEKOLAH: data.KODSEKOLAH,
            PASSWORD: data.PASSWORD,
            KAPASITI: data.KAPASITI,
            KAPASITI_L: data.KAPASITI_L,
            KAPASITI_P: data.KAPASITI_P,
            IDSEKOLAH: data.IDSEKOLAH
          };
        }, function(data) {
          vm.sbp = {
            status: data.status,
          };
        });
    };

    vm.getSbp = function() {
      var query = vm.calon.agiliran + '/' + vm.calon.kpPenjaga;
      getSbp(query);
    };

    vm.hantar = function() {

      var kpBapa = vm.calon.NOKP_BAPA;
      var kpIbu = vm.calon.NOKP_IBU;
      var inputKP = vm.calon.kpPenjaga;

      if (kpBapa === inputKP) {
        vm.rayuanBerjayaModal.show();
      } else if (kpIbu === inputKP) {
        vm.rayuanBerjayaModal.show();
      } else {
        vm.calon.kpPenjaga = '';
      }

      vm.agiliran = undefined;
    };

    vm.kembali = function() {

      vm.semakanModal.hide();
      vm.agiliran = undefined;
    };
    $scope.$on('$destroy', function() {
      vm.semakanModal.remove();
    });
  });
