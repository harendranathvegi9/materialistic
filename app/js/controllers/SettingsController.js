/*global define*/
/*global chrome*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('SettingsController', ['$scope', 'AppStorageService',
    function($scope, AppStorageService) {

      console.log($scope.appData);

      $scope.$on('$destroy', function() {});

      $scope.saveSettings = function(){
        //Add Set all app data
      };
    }
  ]);
});