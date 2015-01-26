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
        AppStorageService.clearData();
        AppStorageService.setDefaults();
        AppStorageService.setData('timestamp', DateTimeService.formattedDate(new Date()));
        AppStorageService.setData('dataExists', true);
      }

      $scope.appDate = AppStorageService.getData('app');
      $scope.timestamp = AppStorageService.getData('timestamp');

      $scope.flipkart = AppStorageService.getData('flipkart');
      $scope.wordpress = AppStorageService.getData('wordpress');
      $scope.user = AppStorageService.getData('user');

      if (DateTimeService.compare($scope.timestamp, DateTimeService.formattedDate(new Date())) === -1) {
        $location.path('/refresh');
      } else {
        $location.path('/settings');
      }

      $scope.$on('$destroy', function() {});
    }
  ]);
});