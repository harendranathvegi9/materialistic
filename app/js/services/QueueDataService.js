/*global define*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.factory('QueueDataService', [
    '$rootScope',
    '$q',
    'AppStorageService',
    'DateTimeService',
    'WordpressService',
    'GeoLocationService',
    'RhCloudService',
    function($rootScope, $q, AppStorageService, DateTimeService, WordpressService, GeoLocationService, RhCloudService) {

      var _queueData = function() {
        var deffered = $q.defer();
        var progress = 0;
        var servicesQ = [];
        var services = _getServices();

        _.each(services, function(service) {
          var serviceCall = service.service.apply(null, service.arguments);
          serviceCall.then(function() {
            var progressPercent = (progress + 1) / servicesQ.length * 100;
            deffered.notify(progressPercent + '%');
            progress++;
          }, function() {
            deffered.notify('100%');
          });
          servicesQ.push(serviceCall);
        });

        $q.all(servicesQ).then(function(promises) {
          deffered.resolve(promises);
        }, function(error) {
          deffered.reject(error);
        }, function(progress) {
          deffered.notify(progress);
        });
        return deffered.promise;
      };

      var _qData = function() {
        $rootScope.$broadcast('Materialistic:DataRefreshStart');
        _queueData().then(function(promises) {
          $rootScope.$broadcast('Materialistic:DataRefreshEnd', promises);
        }, function(error) {
          $rootScope.$broadcast('Materialistic:DataRefreshError', error);
        }, function(progress) {
          $rootScope.$broadcast('Materialistic:DataRefreshProgress', progress);
        });
      };

      var _getServices = function() {
        return [{
          name: 'geoLocation',
          arguments: [],
          responseToSave:'address.formatted_address',
          service: GeoLocationService.geoLocate
        }, {
          name: 'flipkartDotd',
          arguments: [],
          responseToSave:'data.dotdList',
          service: RhCloudService.api.flipkart.offers.dotd
        }, {
          name: 'flipkartTop',
          arguments: [],
          responseToSave:'data.topOffersList',
          service: RhCloudService.api.flipkart.offers.top
        }, {
          name: 'wordpressFresh',
          arguments: [40],
          responseToSave:'data.posts',
          service: WordpressService.getFresh
        }, {
          name: 'wordpressFollowed',
          arguments: [1, ['wavesnsands.wordpress.com', 'matt.wordpress.com']],
          responseToSave:'data',
          service: WordpressService.getFollowed
        }];
      };

      return {
        qData: _qData,
        qServices: _getServices
      };
    }
  ]);
});