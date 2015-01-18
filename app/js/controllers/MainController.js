/*global define*/
/*global Waves*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('MainController', ['$scope', '$location', '$interval', 'AppStorageService', 'DateTimeService',
    function($scope, $location, $interval, AppStorageService, DateTimeService) {

      if (AppStorageService.getDefaults() === null) {
        AppStorageService.setDefaults();
      }

      $scope.appData = AppStorageService.getAppData();

      /*To randomize*/
      //Math.floor(Math.random() * (13 - 1 + 1)) + 1;
      $scope.currentBg = $scope.appData.defaultBg;

      //Should be dynamically set based on preference
      $location.path('/posts-followed');

      $scope.$on('$destroy', function() {});
    }
  ]);
});