/*global define*/
/*global chrome*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('MainController', ['$scope', '$interval', 'AppStorageService',
    function($scope, $interval, AppStorageService) {

      $scope.panels = {
        sidePanel: 'mm-sidebar-panel',
        contentPanel: 'mm-content-panel'
      };

      if(AppStorageService.getDefaults() === null){
        AppStorageService.setDefaults();
      }

      $scope.appData = AppStorageService.getAppData();

      /*To randomize*/
      //Math.floor(Math.random() * (13 - 1 + 1)) + 1;
      $scope.currentBg = $scope.appData.defaultBg;

      $scope.$on('$destroy', function() {});
    }
  ]);
});