/*global define*/
define(['../module'],function (directivesModule) {
  directivesModule.directive('mmSettings',[function(){
    return {
      replace:true,
      restrict:'E',
      link:function(scope,element,attributes){
        scope.toggleSidebar = function(){
          scope.$emit('Materialistic:CloseSideBar');
        };
      },
      templateUrl:'js/directives/mmSettings/mmSettings.html'
    };
  }]);
});