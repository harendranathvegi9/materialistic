/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmSubheader', [
    '$rootScope',
    '$interval',
    'DateTimeService',
    'GeoLocationService',
    'AppStorageService',
    function($rootScope, $interval, DateTimeService, GeoLocationService, AppStorageService) {
      return {
        replace: true,
        restrict: 'E',
        link: function(scope, element, attributes) {
          $('ul.tabs').tabs();

          scope.dateTime = new Date();
          scope.dateOrdinal = DateTimeService.ordinal(scope.dateTime.getDate());
          scope.greeting = DateTimeService.greeting();
          scope.location = AppStorageService.getData('geoLocation');

          $interval(function() {
            scope.dateTime = new Date();
            scope.dateOrdinal = DateTimeService.ordinal(scope.dateTime.getDate());
          }, 1000);

          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmSubheader/mmSubheader.html'
      };
    }
  ]);
});