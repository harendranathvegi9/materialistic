/*global define*/
/*global chrome*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('AppMainController', [
    '$scope', 'RhCloudService', 'GeoLocationService', 'ChromeStorageService', 'WordpressService',
    function($scope, RhCloudService, GeoLocationService, ChromeStorageService, WordpressService) {

      $scope.className = 'mm-home';

      $scope.app = {};
      $scope.offers = {};
      $scope.offers.top = [{
        title: 'Loading...'
      }];
      $scope.offers.dotd = [{
        title: 'Loading...'
      }];

      RhCloudService.api.flipkart.offers.top().then(function(response) {
        $scope.offers.top = response.data.topOffersList;
        console.log('Rh Cloud', response.data);
      });

      RhCloudService.api.flipkart.offers.dotd().then(function(response) {
        $scope.offers.dotd = response.data.dotdList;
        console.log('Rh Cloud', response.data);
      });

      GeoLocationService.geoLocate().then(function(data) {
        console.log('Geo Location', data);
      }, function(error) {
        console.log(error);
      });

      WordpressService.getFresh(40).then(function(response) {
        console.log('Wordpress', response);
      });

      WordpressService.getFollowed(1,['wavesnsands.wordpress.com','matt.wordpress.com'])
      .then(function(response){
        console.log('Wordpress', response);
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