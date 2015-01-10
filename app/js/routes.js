/*global define*/
define(['./app'], function(app) {
  app
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            controller: 'AppMainController',
            templateUrl: 'partials/home.html'
          })
          .when('/settings', {
            controller: 'AppMainController',
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