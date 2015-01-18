/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmSubheader', ['$rootScope', '$interval', 'DateTimeService', 'GeoLocationService',
    function($rootScope, $interval, DateTimeService, GeoLocationService) {
      return {
        replace: true,
        restrict: 'E',
        link: function(scope, element, attributes) {
          $('ul.tabs').tabs();

          scope.dateTime = new Date();
          scope.dateOrdinal = DateTimeService.ordinal(scope.dateTime.getDate());
          scope.greeting = DateTimeService.greeting();
          scope.location = 'Loading location...';

          $interval(function() {
            scope.dateTime = new Date();
            scope.dateOrdinal = DateTimeService.ordinal(scope.dateTime.getDate());
          }, 1000);

          GeoLocationService.geoLocate().then(function(response){
            scope.location = response.address.formatted_address;
          });

          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmSubheader/mmSubheader.html'
      };
    }
  ]);
});