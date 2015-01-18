/*global define*/
/*global chrome*/
define(['./module', 'underscore'], function(controllerModule, _) {
  controllerModule.controller('AppMainController', [
    '$scope', '$timeout', 'RhCloudService', 'ChromeStorageService', 'WordpressService',
    function($scope, $timeout, RhCloudService, ChromeStorageService, WordpressService) {

      $scope.className = 'mm-home';

      $scope.app = {};
      $scope.offers = {};
      $scope.offers.top = [{
        title: 'Loading...'
      }];
      $scope.offers.dotd = [{
        title: 'Loading...'
      }];

      $scope.wordpress = {
        fresh: [],
        followed: [],
        currentFresh: {},
        currentFreshIndex: false
      };

      RhCloudService.api.flipkart.offers.top().then(function(response) {
        $scope.offers.top = response.data.topOffersList;
        console.log('Rh Cloud', response.data);
      });

      RhCloudService.api.flipkart.offers.dotd().then(function(response) {
        $scope.offers.dotd = response.data.dotdList;
        console.log('Rh Cloud', response.data);
      });

      WordpressService.getFresh(40).then(function(response) {
        console.log('Wordpress', response);

        $scope.wordpress.fresh = response.data.posts;
      });

      WordpressService.getFollowed(1, ['wavesnsands.wordpress.com', 'matt.wordpress.com'])
        .then(function(response) {
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