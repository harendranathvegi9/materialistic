/*global define*/
define(['./app'], function(app) {
  app
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/home', {
            controller: 'AppMainController',
            templateUrl: 'partials/home.html'
          })
          .when('/wordpress/:type', {
            controller: 'WordpressPostsController',
            templateUrl: 'partials/wordpress.html'
          })
          .when('/flipkart/:type', {
            controller: 'FlipkartDealsController',
            templateUrl: 'partials/flipkart.html'
          })
          .when('/settings', {
            controller: 'SettingsController',
            templateUrl: 'partials/settings.html'
          })
          .when('/about', {
            controller: 'AppMainController',
            templateUrl: 'partials/about.html'
          })
          .when('/refresh', {
            controller: 'RefreshErrorController',
            templateUrl: 'partials/refresh.html'
          })
          .otherwise('/home');
      }
    ]);
});