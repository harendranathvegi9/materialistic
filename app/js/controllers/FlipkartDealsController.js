/*global define*/
/*global chrome*/
define(['./module', 'underscore'], function(controllerModule, _) {
  controllerModule.controller('FlipkartDealsController', [
    '$scope',
    '$timeout',
    '$routeParams',
    'AppStorageService',
    function($scope, $timeout, $routeParams, AppStorageService) {
      $scope.deals = [];
      if($routeParams.type === 'top'){
        $scope.deals = AppStorageService.getData('flipkartTop');
      } else if($routeParams.type === 'dotd'){
        $scope.deals = AppStorageService.getData('flipkartDotd');
      } else{
        //Redirect to 404
      }
      console.log($scope.deals);
    }
  ]);
});