/*global define*/
define(['../module'],function (directivesModule) {
  directivesModule.directive('mmSettings',[function(){
    return {
      replace:true,
      restrict:'E',
      link:function(scope,element,attributes){
        
      },
      templateUrl:'js/directives/mmSettings/mmSettings.html'
    };
  }]);
});