/*global define*/
/*global toast*/
define(['./module', 'underscore'], function(controllersModule, _) {
  controllersModule.controller('UserSettingsController', [
    '$scope',
    'AppStorageService',
    function($scope, AppStorageService) {
      
      $scope.saveData = function() {
        AppStorageService.setData('user', $scope.user);
        $scope.userSettings.$setPristine();
        toast('User settings saved successfully!', 2000);
      };
    }
  ]);
});