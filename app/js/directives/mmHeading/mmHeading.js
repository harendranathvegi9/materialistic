/*global define*/
define(['../module'],function (directivesModule) {
  directivesModule.directive('mmHeading',[function(){
    return {
      replace:true,
      restrict:'E',
      link:function(scope,element,attributes){
        
      },
      templateUrl:'js/directives/mmHeading/mmHeading.html'
    };
  }]);
});