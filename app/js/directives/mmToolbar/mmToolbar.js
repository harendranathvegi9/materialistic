/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmToolbar', ['$rootScope',
    function($rootScope) {
      return {
        replace: true,
        restrict: 'E',
        link: function(scope, element, attributes) {

          $(document).ready(function() {
            $("#mm-toolbar").sticky({
              topSpacing: 0,
              wrapperClassName: 'navbar-fixed',
              className: ''
            }).on('sticky-start', function() {
              $(this).addClass('mm-toolbar-scroll mm-toolbar-shadow');
            }).on('sticky-end', function() {
              $(this).removeClass('mm-toolbar-scroll mm-toolbar-shadow');
            });

            $(window).resize(function(){
              $("#mm-toolbar").sticky('update');
            });

          });

          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmToolbar/mmToolbar.html'
      };
    }
  ]);
});