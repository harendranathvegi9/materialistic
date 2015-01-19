/*global define*/
define(['../module', 'underscore'], function(directivesModule, _) {
  directivesModule.directive('mmWaves', ['$rootScope', '$window',
    function($rootScope, $window) {
      return {
        replace: true,
        restrict: 'A',
        link: function(scope, element, attributes) {

          var classes = attributes.class || '';
          var rippleColor = attributes.mmWaves || 'waves-light';
          //Convert into an array
          classes = classes.split(' ');
          //Add the ripple color and binding class before the array and create final classes to be applied
          classes = _.union(['waves-effect', rippleColor], classes).join(' ');
          //Apply the class by removing all the previous ones
          element.removeClass().addClass(classes);
          //Prevent touchstart and mousedown from porpogating upwards
          element.on('touchstart mousedown', function(event) {
            event.stopPropagation();
          });
          //Attach the waves ripple effect
          $window.Waves.attach(element[0]);
          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        }
      };
    }
  ]);
});