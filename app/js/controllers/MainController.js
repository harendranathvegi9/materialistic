/*global define*/
/*global chrome*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('MainController', ['$scope', '$interval',
    function($scope, $interval) {
      $scope.panels = {
        sidePanel: 'mm-sidebar-panel',
        contentPanel: 'mm-content-panel'
      };

      $scope.currentBg = 7;//Math.floor(Math.random() * (13 - 1 + 1)) + 1;

      $scope.$on('$destroy', function() {});
    }
  ]);
});