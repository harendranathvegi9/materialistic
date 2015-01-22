/*global define*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.factory('AppStorageService', ['localStorageService', 'DateTimeService',
    function(localStorageService, DateTimeService) {
      ///Thanks to Dave Furfero for extending underscore
      _.mixin({
        // Get/set the value of a nested property
        deep: function(obj, key, value) {
          var keys = key.replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.'),
            root,
            i = 0,
            n = keys.length;

          // Set deep value
          if (arguments.length > 2) {

            root = obj;
            n--;

            while (i < n) {
              key = keys[i++];
              obj = obj[key] = _.isObject(obj[key]) ? obj[key] : {};
            }

            obj[keys[i]] = value;

            value = root;

            // Get deep value
          } else {
            while ((obj = obj[keys[i++]]) != null && i < n) {}
            value = i < n ? void 0 : obj;
          }

          return value;
        },
        pluckDeep: function(obj, key) {
          return _.map(obj, function(value) {
            return _.deep(value, key);
          });
        }, // Return a copy of an object containing all but the blacklisted properties.
        unpick: function(obj) {
          obj = obj || {};
          return _.pick(obj, _.difference(_.keys(obj), _.flatten(Array.prototype.slice.call(arguments, 1))));
        }
      });

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
          lastTimestamp: DateTimeService.formattedDate(new Date())
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
        localStorageService.set(key, value);
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