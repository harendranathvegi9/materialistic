/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmPostDetail', ['$rootScope',
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
        templateUrl: 'js/directives/mmPostDetail/mmPostDetail.html'
      };
    }
  ]);
});