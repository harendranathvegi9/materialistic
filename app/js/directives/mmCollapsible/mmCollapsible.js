/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmCollapsible', ['$rootScope',
    function($rootScope) {
      return {
        replace: true,
        restrict: 'C',
        link: function(scope, element, attributes) {
          element.collapsible();
          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        }
      };
    }
  ]);
});