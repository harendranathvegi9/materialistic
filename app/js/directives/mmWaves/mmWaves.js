/*global define*/
define(['../module', 'underscore'], function(directivesModule, _) {
  directivesModule.directive('mmWaves', ['$rootScope', '$window', '$timeout',
    function($rootScope, $window, $timeout) {
      return {
        replace: true,
        restrict: 'A',
        link: function(scope, element, attributes) {
          var classes = attributes.class || '';
          var rippleColor = attributes.mmWaves || 'waves-light';
          var rippleRaise = _.has(attributes, 'rippleRaise');
          var rippleRaiseTimeout;
          var _cancelTimeout = function() {
            if (rippleRaiseTimeout) {
              $timeout.cancel(rippleRaiseTimeout);
            }
            return;
          };
          //Convert into an array
          classes = classes.split(' ');
          //Add the ripple color and binding class before the array and create final classes to be applied
          classes = _.union(['waves-effect', rippleColor], classes).join(' ');
          //Apply the class by removing all the previous ones
          element.removeClass().addClass(classes);
          //Prevent touchstart and mousedown from porpogating upwards
          element.on('touchstart mousedown', function(event) {
            event.stopPropagation();
            if (rippleRaise) {
              element.addClass(attributes.rippleRaise);
            }
          });
          element.on('touchend mouseup', function(event) {
            event.stopPropagation();
            if (rippleRaise) {
              _cancelTimeout();

              rippleRaiseTimeout = $timeout(function() {
                element.removeClass(attributes.rippleRaise);
              }, 300, false);
            }
          });
          //Attach the waves ripple effect
          $window.Waves.attach(element[0]);
          /*Unbind*/
          scope.$on('$destroy', function() {
            _cancelTimeout();
          });
        }
      };
    }
  ]);
});