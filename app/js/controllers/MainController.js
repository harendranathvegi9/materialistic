/*global define*/
/*global chrome*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('MainController', ['$scope', '$interval', '$mdSidenav', 'DateTimeService',
    function($scope, $interval, $mdSidenav, DateTimeService) {
      $scope.currentDateTime = new Date();
      $scope.greetingMessage = DateTimeService.greeting();
      $scope.setOrdinal = function() {
        $scope.dateOridinal = DateTimeService.ordinal($scope.currentDateTime.getDate());
      };
      $scope.setOrdinal();

      $scope.toggleSettingsLeft = function() {
        $mdSidenav('mm-settings-sidebar')
          .toggle()
          .then(function() {
            //Addition functionality
          });
      };

      var timeInterval = $interval(function() {
        $scope.currentDateTime = new Date();
        $scope.setOrdinal();
      }, 1000);

      $scope.$on('$destroy', function() {
        $interval.cancel(timeInterval);
      });
    }
  ]);
});