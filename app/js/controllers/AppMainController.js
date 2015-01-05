/*global define*/
/*global chrome*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('AppMainController', ['$scope', '$interval', 'MaterialisticCloudService', 'GeoLocationService', 'DateTimeService',

    function($scope, $interval, MaterialisticCloudService, GeoLocationService, DateTimeService) {
      $scope.app = {};
      $scope.app.appName = 'Angular Material RequireJS Seed';
      $scope.app.author = {
        name: 'Nisheed Jagadish',
        email: 'nisheedj@thoughtworks.com'
      };

      $scope.currentTime = new Date();
      $scope.address = {
        formatted_address:'Loading...'
      };
      $scope.offers = {};
      $scope.offers.top = [{
        title: 'Loading...'
      }];
      $scope.offers.dotd = [{
        title: 'Loading...'
      }];
      $scope.greeting = DateTimeService.greeting();


      MaterialisticCloudService.api.flipkart.offers.top().then(function(response) {
        $scope.offers.top = response.data.topOffersList;
        console.log(response.data);
      });

      MaterialisticCloudService.api.flipkart.offers.dotd().then(function(response) {
        $scope.offers.dotd = response.data.dotdList;
        console.log(response.data);
      });

      GeoLocationService.getLocation();

      $scope.$on('Materialistic:GeoLocationFound', function(e, data) {
        GeoLocationService.getCurrenAddress(data).then(function(response) {
          $scope.address = GeoLocationService.getAddressByType(response.data, 'locality');
        });
      });

      $scope.goToUrl = function(url) {
        chrome.tabs.create({
          url: url,
          active: false,
        }, function() {});
      };

      var timeInterval = $interval(function() {
        $scope.currentTime = new Date();
      }, 1000);

      $scope.app.appRepo = "https://github.com/nisheedj/angular-material-requirejs-seed.git";

      $scope.getAuthorName = function() {
        return $scope.app.author.name;
      };
    }
  ]);
});