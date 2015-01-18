/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmHeaderTabs', ['$rootScope',
    function($rootScope) {
      return {
        replace: true,
        restrict: 'E',
        link: function(scope, element, attributes) {

          $(document).ready(function() {
            $('#mm-header-tabs ul.tabs').tabs();

            $('#mm-header-tabs').sticky({
              topSpacing: 56,
              className: 'mm-header-tabs-sticky'
            })
              .on('sticky-start', function() {
                $("#mm-toolbar").removeClass('mm-toolbar-shadow');
                $(this).addClass('mm-header-tabs-scroll');
              })
              .on('sticky-end', function() {
                $("#mm-toolbar").addClass('mm-toolbar-shadow');
                $(this).removeClass('mm-header-tabs-scroll');
              });

             $(window).resize(function(){
              $("#mm-header-tabs").sticky('update');
            });
          });

          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmHeaderTabs/mmHeaderTabs.html'
      };
    }
  ]);
});