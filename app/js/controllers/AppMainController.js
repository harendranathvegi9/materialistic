/*global define*/
/*global chrome*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('AppMainController', [
    '$scope', 'MaterialisticCloudService', 'GeoLocationService', 'ChromeStorageService',
    function($scope, MaterialisticCloudService, GeoLocationService, ChromeStorageService) {
      
      $scope.className = 'mm-home';

      $scope.app = {};
      $scope.offers = {};
      $scope.offers.top = [{
        title: 'Loading...'
      }];
      $scope.offers.dotd = [{
        title: 'Loading...'
      }];

      MaterialisticCloudService.api.flipkart.offers.top().then(function(response) {
        $scope.offers.top = response.data.topOffersList;
        console.log(response.data);
      });

      MaterialisticCloudService.api.flipkart.offers.dotd().then(function(response) {
        $scope.offers.dotd = response.data.dotdList;
        console.log(response.data);
      });

      GeoLocationService.geoLocate().then(function(data) {
        console.log(data);
      }, function(error) {
        console.log(error);
      });


      ChromeStorageService.find('MaterialisticMeExt.app').then(function(data) {
        console.log(data);
      });

      $scope.goToUrl = function(url) {
        chrome.tabs.create({
          url: url,
          active: false,
        }, function() {});
      };
    }
  ]);
});