/*global define*/
/*global toast*/
define(['./module', 'underscore'], function(controllersModule, _) {
  controllersModule.controller('WordpressSettingsController', [
    '$scope',
    'AppStorageService',
    function($scope, AppStorageService) {
      
      $scope.saveData = function() {
        AppStorageService.setData('wordpress', $scope.wordpress);
        $scope.wordpressSettings.$setPristine();
        toast('Wordpress settings saved successfully!', 2000);
      };

      $scope.addBlog = function() {
        $scope.wordpress.followedBlogs.push(angular.element('#blogName').val());
        angular.element('#blogName').val('').blur();
      };

      $scope.removeBlog = function(index) {
        $scope.wordpress.followedBlogs.splice(index, 1);
      };

      $scope.$watchCollection('wordpress.followedBlogs', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          $scope.wordpressSettings.$setDirty();
        }
      });
    }
  ]);
});