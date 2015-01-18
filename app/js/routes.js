/*global define*/
define(['./app'], function(app) {
  app
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/',{
            controller:'AppMainController',
            templateUrl:'partials/home.html'
          })
          .when('/posts-fresh', {
            controller: 'FreshPostsController',
            templateUrl: 'partials/posts-fresh.html'
          })
          .when('/posts-followed', {
            controller: 'FollowedPostsController',
            templateUrl: 'partials/posts-followed.html'
          })
          .when('/settings', {
            controller: 'SettingsController',
            templateUrl: 'partials/settings.html'
          })
          .when('/about', {
            controller: 'AppMainController',
            templateUrl: 'partials/about.html'
          })
          .when('/search', {
            controller: 'AppMainController',
            templateUrl: 'partials/search.html'
          });
      }
    ]);
});