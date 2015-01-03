/*global define*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('AppMainController', ['$scope', 'MaterialisticCloudService',

    function($scope, MaterialisticCloudService) {
      $scope.app = {};
      $scope.app.appName = 'Angular Material RequireJS Seed';
      $scope.app.author = {
        name: 'Nisheed Jagadish',
        email: 'nisheedj@thoughtworks.com'
      };

      $scope.offers = {};
      $scope.offers.top = [];
      $scope.offers.dotd = [];

      MaterialisticCloudService.api.flipkart.offers.top().then(function(response){
        $scope.offers.top = response.data.topOffersList;
        console.log(response.data);
      });

      MaterialisticCloudService.api.flipkart.offers.dotd().then(function(response){
        $scope.offers.dotd = response.data.dotdList;
        console.log(response.data);
      });

      $scope.app.appRepo = "https://github.com/nisheedj/angular-material-requirejs-seed.git";

      $scope.getAuthorName = function() {
        return $scope.app.author.name;
      };
    }
  ]);
});