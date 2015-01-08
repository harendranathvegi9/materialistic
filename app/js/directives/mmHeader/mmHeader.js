/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmHeader', ['$window', '$mdMedia',
    function($window, $mdMedia) {
      return {
        replace: true,
        restrict: 'E',
        link: function(scope, element, attributes) {

          scope.mdTall = $mdMedia('gt-md');
          scope.mmBg = attributes.mmBg;

          /*Watch*/
          var unWatchMmBg = scope.$watch(attributes.mmBg, function(value, old) {
            if (value !== old) {
              element.removeClass('mm-bg-' + old).addClass('mm-bg-' + value);
            } else {
              element.addClass('mm-bg-' + value);
            }
          });

          /*Events*/
          var unbindResize = angular.element($window).on('resize', function() {
            scope.mdTall = $mdMedia('gt-md');
          });

          /*Unbind*/
          scope.$on('$destroy', function() {
            unbindResize();
            unWatchMmBg();
          });
        },
        templateUrl: 'js/directives/mmHeader/mmHeader.html'
      };
    }
  ]);
});