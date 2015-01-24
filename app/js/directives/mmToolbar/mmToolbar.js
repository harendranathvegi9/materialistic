/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmToolbar', ['$rootScope', '$location',
    function($rootScope, $location) {
      return {
        replace: true,
        restrict: 'E',
        link: function(scope, element, attributes) {

          var _shadowClasses = 'z-depth-1 z-depth-2';

          element.sticky({
            topSpacing: 0,
            wrapperClassName: 'navbar-fixed',
            className: ''
          }).on('sticky-start', function() {
            $(this).removeClass(_shadowClasses).addClass('z-depth-2');
          }).on('sticky-end', function() {
            $(this).removeClass(_shadowClasses).addClass('z-depth-1');
          });

          $(window).resize(function() {
            element.sticky('update');
          });


          scope.refreshData = function() {
            $location.path('/refresh');
          };

          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmToolbar/mmToolbar.html'
      };
    }
  ]);
});