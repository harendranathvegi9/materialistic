/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmToolbar', ['$rootScope',
    function($rootScope) {
      return {
        replace: true,
        restrict: 'E',
        link: function(scope, element, attributes) {

          $('.dropdown-button').dropdown({
            hover:false
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