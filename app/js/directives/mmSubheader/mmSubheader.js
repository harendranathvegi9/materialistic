/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmSubheader', ['$rootScope',
    function($rootScope) {
      return {
        replace: true,
        restrict: 'E',
        link: function(scope, element, attributes) {
          $('ul.tabs').tabs();
          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmSubheader/mmSubheader.html'
      };
    }
  ]);
});