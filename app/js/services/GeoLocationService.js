/*global define*/
/*global navigator*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.factory('GeoLocationService', ['$q', '$http',
    function($q, $http) {

      var _getNavigatorLocation = function() {
        var deffered = $q.defer();
        navigator.geolocation.getCurrentPosition(function(position) {
          deffered.resolve(position);
        }, function(error) {
          deffered.reject(error);
        });
        return deffered.promise;
      };

      var _getMapsAddress = function(position) {
        return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            sensor: false,
            latlng: position.coords.latitude + ',' + position.coords.longitude
          }
        });
      };

      var _getAddressByType = function(locationData, addressType) {
        var addressArray = _.filter(locationData.results, function(address) {
          return _.contains(address.types, addressType);
        });
        return addressArray.length > 1 ? addressArray : addressArray[0];
      };

      var _geoLocate = function() {
        var deffered = $q.defer();
        _getNavigatorLocation().then(function(position) {
          _getMapsAddress(position).then(function(response) {
            var timestamp = new Date();
            if (response.data.status === 'OK') {
              var address = _getAddressByType(response.data, 'postal_code');
              deffered.resolve({
                address: address,
                timestamp: timestamp
              });
            } else {
              deffered.reject({
                error: response.data.status,
                timestamp: timestamp
              });
            }
          });
        });

        return deffered.promise;
      };

      return {
        getLocation: _getNavigatorLocation,
        getAddress: _getMapsAddress,
        geoLocate: _geoLocate
      };
    }
  ]);
});