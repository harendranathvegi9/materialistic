/*global define*/
/*global chrome*/
define(['./module', 'underscore'], function(controllerModule, _) {
  controllerModule.controller('FollowedPostsController', ['$scope', '$timeout', 'AppStorageService', 'WordpressService',
    function($scope, $timeout, AppStorageService, WordpressService) {
      $scope.wordpress = {
        followed: [],
        currentFollowed: {},
        currentFollowedIndex: false
      };


      WordpressService.getFollowed(1, ['wavesnsands.wordpress.com', 'matt.wordpress.com'])
        .then(function(response) {
          var posts = [];
          _.each(response.data, function(site) {
            _.each(site.posts, function(post) {
              posts.push(post);
            });
          });
          $scope.wordpress.followed = posts;
          $('html,body').animate({
            scrollTop: $('.mm-greeting-card').eq(0).height()
          }, 300);
        });


      $scope.showPostDetailsFollowed = function(index) {
        $scope.wordpress.currentFollowed = $scope.wordpress.followed[index];
        $scope.wordpress.currentFollowedIndex = index;
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
          getWidthFrom: '#post-followed-detail-container',
          responsiveWidth: true
        });
      }, 100);

      $(window).resize(function() {
        _setPostDetailsHeight();
      });
    }
  ]);
});