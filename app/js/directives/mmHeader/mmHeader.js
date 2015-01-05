/*global define*/
define(['../module'],function (directivesModule) {
  directivesModule.directive('mmHeader',[function(){
    return {
      replace:true,
      restrict:'E',
      link:function(scope,element,attributes){
        
      },
      templateUrl:'js/directives/mmHeader/mmHeader.html'
    };
  }]);
});