/*global define*/
define(['../module', 'underscore'], function(directivesModule, _) {
  directivesModule.directive('mmSidebarHeader', ['$window', 'GeoLocationService',

    function($window, GeoLocationService) {
      return {
        restrict: 'E',
        replace: true,
        link: function(scope, element, attributes) {
          scope.location = 'Loading...';

          GeoLocationService.geoLocate().then(function(data) {
            scope.location = data.address.formatted_address;
          }, function(error) {
            scope.location = 'Location Error! :|';
          });

          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmSidebarHeader/mmSidebarHeader.html'
      };
    }
  ]);
});