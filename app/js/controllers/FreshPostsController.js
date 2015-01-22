/*global define*/
/*global chrome*/
define(['./module', 'underscore'], function(controllerModule, _) {
  controllerModule.controller('FreshPostsController', ['$scope', '$timeout', 'AppStorageService', 'WordpressService',
    function($scope, $timeout, AppStorageService, WordpressService) {
      $scope.wordpress = {
        fresh: [],
        currentFresh: {},
        currentFreshIndex: false
      };

      $scope.wordpress.fresh = AppStorageService.getData('wordpressFresh');

      $scope.showPostDetailsFresh = function(index) {
        $scope.wordpress.currentFresh = $scope.wordpress.fresh[index];
        $scope.wordpress.currentFreshIndex = index;
        _setPostDetailsHeight();
        $('#post-detail').sticky('update');
      };

      var _getClientHeight = function() {
        var w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;
        return {
          width: x,
          height: y
        };
      };

      var _setPostDetailsHeight = function() {
        var height = 104;
        var clientHeight = _getClientHeight().height;
        $('#post-detail').height(clientHeight - height - 30);
      };


      $timeout(function() {
        
        _setPostDetailsHeight();
        
        $('#post-detail').sticky({
          topSpacing: 111,
          getWidthFrom: '#post-fresh-detail-container',
          responsiveWidth: true
        });
        
        $('html,body').animate({
          scrollTop: $('.mm-greeting-card').eq(0).height()
        }, 300);

      }, 100);

      $(window).resize(function() {
        _setPostDetailsHeight();
      });
    }
  ]);
});