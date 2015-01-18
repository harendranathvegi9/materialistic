/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmProgressSpinner', ['$rootScope',
    function($rootScope) {
      return {
        replace: true,
        restrict: 'E',
        link: function(scope, element, attributes) {
          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmProgressSpinner/mmProgressSpinner.html'
      };
    }
  ]);
});