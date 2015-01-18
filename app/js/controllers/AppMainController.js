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


      $scope.showPostDetailsFresh = function(index) {
        $scope.wordpress.currentFresh = $scope.wordpress.fresh[index];
        $scope.wordpress.currentFreshIndex = index;
        $('#post-fresh-detail').sticky('update');
      };

      var _getClientHeight = function(){
        var w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;
        return {
          width: x,
          height:y
        };
      };

      var _setPostDetailsHeight = function(){
        var height = 104;
        var clientHeight = _getClientHeight().height;
        $('#post-fresh-detail').height(clientHeight - height - 30);
      };


      $timeout(function() {
        _setPostDetailsHeight();
        $('#post-fresh-detail').sticky({
          topSpacing: 111,
          getWidthFrom: '#post-fresh-detail-container',
          responsiveWidth: true
        });
      }, 100);

      $(window).resize(function(){
        _setPostDetailsHeight();
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