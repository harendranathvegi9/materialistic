/*global define*/
/*global chrome*/
define(['./module'], function(servicesModule) {
  servicesModule.factory('ChromeStorageService', ['$q',
    function($q) {

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

      /*GET FUNCTIONS*/
      var _getAsync = function(query) {
        var deffered = $q.defer();
        chrome.storage.local.get(query, function(data) {
          if (!chrome.runtime.lastError) {
            deffered.resolve({
              status: 'OK',
              data: data
            });
          } else {
            deffered.reject({
              status: 'RUNTIME_ERROR'
            });
          }
        });
        return deffered.promise;
      };
      
      var _getAllAsync = function() {
        return _getAsync(null);
      };

      var _getSizeAsync = function() {
        var deffered = $q.defer();
        chrome.storage.local.getBytesInUse(null, function(bytesInUse) {
          if (!chrome.runtime.lastError) {
            deffered.resolve({
              status: 'OK',
              bytesInUse: bytesInUse
            });
          } else {
            deffered.reject({
              status: 'RUNTIME_ERROR'
            });
          }
        });
        return deffered.promise;
      };
      /*
        eg. _find('api.name');
       */
      var _findAsync = function(deepProperty) {
        var deffered = $q.defer();
        _getAsync(null).then(function(data) {
          var filtered = _.deep(data.data, deepProperty);
          deffered.resolve(filtered);
        }, function() {
          deffered.reject({
            status: 'RUNTIME_ERROR'
          });
        });
        return deffered.promise;
      };

      /*SET FUNCTIONS*/
      var _setAsync = function(data) {
        var deffered = $q.defer();
        chrome.storage.local.set(data, function() {
          if (!chrome.runtime.lastError) {
            deffered.resolve({
              status: 'OK'
            });
          } else {
            deffered.reject({
              status: 'RUNTIME_ERROR'
            });
          }
        });
        return deffered.promise;
      };

      var _removeAsync = function(data) {
        var deffered = $q.defer();
        chrome.storage.local.remove(data, function() {
          if (!chrome.runtime.lastError) {
            deffered.resolve({
              status: 'OK'
            });
          } else {
            deffered.reject({
              status: 'RUNTIME_ERROR'
            });
          }
        });
        return deffered.promise;
      };

      var _purgeAsync = function() {
        var deffered = $q.defer();
        chrome.storage.local.clear(function() {
          if (!chrome.runtime.lastError) {
            deffered.resolve({
              status: 'OK'
            });
          } else {
            deffered.reject({
              status: 'RUNTIME_ERROR'
            });
          }
        });
        return deffered.promise;
      };

      return {
        get: _getAsync,
        all: _getAllAsync,
        size: _getSizeAsync,
        set: _setAsync,
        remove: _removeAsync,
        purge: _purgeAsync,
        find: _findAsync
      };
    }
  ]);
});