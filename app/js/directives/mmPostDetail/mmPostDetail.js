/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmPostDetail', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
      return {
        replace: true,
        restrict: 'E',
        scope: {
          post: '='
        },
        link: function(scope, element, attributes) {

          var wavesFullTimeout;
          var removeClassTimeout;
          var _cancelTimeout = function() {
            if (wavesFullTimeout) {
              $timeout.cancel(wavesFullTimeout);
            }
            if (removeClassTimeout) {
              $timeout.cancel(removeClassTimeout);
              element.removeClass('wave-transition wave-transition-full');
            }
            return;
          };

          var unbindPostWatch = scope.$watch('post', function(newVal, oldVal) {
            _cancelTimeout();
            element.addClass('wave-transition');
            wavesFullTimeout = $timeout(function() {
              element.addClass('wave-transition-full');
            }, 50, false);
            removeClassTimeout = $timeout(function() {
              element.removeClass('wave-transition wave-transition-full');
            }, 750, false);
          });

          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmPostDetail/mmPostDetail.html'
      };
    }
  ]);
});