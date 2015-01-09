/*global define*/
/*Shim to set the color of the icons*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmIconFill', ['$timeout',
    function($timeout) {
      return {
        replace: true,
        restrict: 'A',
        link: function(scope, element, attributes) {
          var object = angular.element(element[0].children[0]);
          if (angular.isDefined(attributes.mmIconFill)) {
            object.load(function() {
              var svg = angular.element(this.getSVGDocument().documentElement);
              svg.attr('fill', attributes.mmIconFill);
            });
          }
        }
      };
    }
  ]);
});