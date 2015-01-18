/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmPostCard', ['$rootScope',
    function($rootScope) {
      return {
        replace: true,
        restrict: 'E',
        scope: {
          post: '='
        },
        link: function(scope, element, attributes) {
          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmPostCard/mmPostCard.html'
      };
    }
  ]);
});