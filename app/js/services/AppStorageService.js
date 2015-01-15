/*global define*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.factory('AppStorageService', ['localStorageService',
    function(localStorageService) {
      var _defaults = {
        appData: {
          appName: 'MaterialisticMe',
          appAuthor: 'Nisheed Jagadish',
          username: 'User',
          wordpressFollows: [
            'wavesnsands.wordpress.com'
          ],
          flipkartDotd: true,
          flipkartTop: true,
          showTime: true,
          showLocation: true,
          stayFresh: false,
          defaultBg: 7,
          lastTimestamp: new Date()
        },
        appDataExists: true
      };


      var _checkDefaults = function() {
        return localStorageService.get('appDataExists');
      };
      var _setDefaults = function() {
        _.each(_defaults, function(value, key) {
          localStorageService.set(key, value);
        });
      };

      var _getAppData = function(key) {
        var data = localStorageService.get('appData');
        if (!key) {
          return data;
        }
        return _.property(key)(data);
      };

      var _setAppData = function(key, value) {
        var data = localStorageService.get('appData');
        if (_.has(data, key)) {
          data[key] = value;
          localStorageService.set('appData', data);
          return data;
        }
        return false;
      };

      var _getData = function(key) {
        return localStorageService.get(key);
      };

      var _setData = function(key, value) {
        localStorageService.set('key', value);
        return;
      };

      return {
        getDefaults: _checkDefaults,
        setDefaults: _setDefaults,
        getAppData: _getAppData,
        setAppData: _setAppData,
        getData: _getData,
        setData: _setData
      };
    }
  ]);
});