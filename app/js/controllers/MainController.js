/*global define*/
/*global Waves*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('MainController', [
    '$scope',
    '$rootScope',
    '$location',
    'AppStorageService',
    'DateTimeService',
    'QueueDataService',
    function($scope, $rootScope, $location, AppStorageService, DateTimeService, QueueDataService) {

      if (AppStorageService.getDefaults() === null) {
        AppStorageService.setDefaults();
      }

      $scope.appData = AppStorageService.getAppData();
      /*To randomize*/
      //Math.floor(Math.random() * (13 - 1 + 1)) + 1;
      $scope.currentBg = $scope.appData.defaultBg;

      if(DateTimeService.compare($scope.appData.lastTimestamp, DateTimeService.formattedDate(new Date())) === -1){
        $location.path('/refresh');
      } else {
        $location.path('/flipkart/top');
      }

      $scope.$on('$destroy', function() {});
    }
  ]);
});