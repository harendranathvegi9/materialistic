/*global define*/
define(['./module', 'underscore'], function(controllersModule, _) {
  controllersModule.controller('WordpressPostsController', [
    '$scope',
    '$routeParams',
    '$timeout',
    'AppStorageService',
    function($scope, $routeParams, $timeout, AppStorageService) {
      $scope.posts = [];
      $scope.currentPost = {};
      $scope.currentIndex = false;

      if ($routeParams.type === 'fresh') {

        $scope.posts = AppStorageService.getData('wordpressFresh');

      } else if ($routeParams.type === 'followed') {

        var _blogsFollowed = AppStorageService.getData('wordpressFollowed');
        var _posts = [];

        _.each(_blogsFollowed, function(blog) {
          _.each(blog.posts, function(post) {
            _posts.push(post);
          });
        });

        $scope.posts = _posts;

      } else {
        //Redirect to 404 page
      }

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
        var toolbarHeight = $('#mm-toolbar').height();
        var detailsMargin = 16;
        var detailsWidth = $('#post-detail-wrapper').width();
        var clientHeight = _getClientHeight().height;
        $('#post-detail').css({
          position: 'fixed',
          top: toolbarHeight,
          width: detailsWidth,
          height: clientHeight - toolbarHeight - detailsMargin
        });
      };

      $scope.showPostDetailsFresh = function(index) {
        $scope.currentPost = $scope.posts[index];
        $scope.currentIndex = index;
      };

      $timeout(function() {
        _setPostDetailsHeight();
      }, 100);

      $(window).resize(function() {
        _setPostDetailsHeight();
      });
    }
  ]);
});