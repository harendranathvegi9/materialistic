/*global define*/
/*global chrome*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('RefreshErrorController', [
    '$scope',
    '$rootScope',
    '$route',
    '$location',
    '$window',
    'QueueDataService',
    'AppStorageService',
    'DateTimeService',
    function($scope, $rootScope, $route, $location, $window, QueueDataService, AppStorageService, DateTimeService) {

      $scope.dataError = false;
      $scope.progress = 0;

      $scope.tryAgain = function() {
        $route.reload();
      };

      var unbindRefreshStart = $rootScope.$on('Materialistic:DataRefreshStart', function() {});

      var unbindRefreshProgress = $rootScope.$on('Materialistic:DataRefreshProgress', function(e, progress) {
        $scope.progress = progress;
      });

      var unbindRefreshEnd = $rootScope.$on('Materialistic:DataRefreshEnd', function(e, data) {
        //Do stuff with data here
        _.each(QueueDataService.qServices(), function(service, index) {
          AppStorageService.setData(service.name, _.deep(data[index], service.responseToSave));
        });

        AppStorageService.setData('timestamp', DateTimeService.formattedDate(new Date()));

        $location.replace().path('/');
        $window.location.reload();

      });

      var unbindRefreshError = $rootScope.$on('Materialistic:DataRefreshError', function(e, error) {
        $scope.dataError = true;
      });

      QueueDataService.qData();

      $scope.$on('$destroy', function() {
        unbindRefreshStart();
        unbindRefreshProgress();
        unbindRefreshEnd();
        unbindRefreshError();
      });
    }
  ]);
});