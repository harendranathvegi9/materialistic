/*global define*/
/*global toast*/
define(['./module', 'underscore'], function(controllersModule, _) {
  controllersModule.controller('FlipkartSettingsController', [
    '$scope',
    'AppStorageService',
    function($scope, AppStorageService) {
      $scope.saveData = function() {
        AppStorageService.setData('flipkart', $scope.flipkart);
        $scope.flipkartSettings.$setPristine();
        toast('Flipkart settings saved successfully!', 2000);
      };
    }
  ]);
});