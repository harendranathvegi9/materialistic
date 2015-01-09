/*global define*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('BottomSheetController', ['$scope', '$routeParams', '$mdBottomSheet',
    function($scope, $routeParams, $mdBottomSheet) {
      $scope.menuItems = [{
        name: 'Home',
        icon: 'home'
      }, {
        name: 'Settings',
        icon: 'settings'
      }, {
        name: 'FAQ',
        icon: 'question_answer'
      }];

      console.log($routeParams);
    }
  ]);
});