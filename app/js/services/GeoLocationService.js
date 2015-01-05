/*global define*/
/*global navigator*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.factory('GeoLocationService', ['$rootScope', '$http',
    function($rootScope, $http) {

      var _setCurrentLocation = function(position) {
        $rootScope.$broadcast('Materialistic:GeoLocationFound', position);
      };
      var _getCurrentGeoLocation = function() {
        return navigator.geolocation.getCurrentPosition(_setCurrentLocation);
      };
      var _getCurrentAddress = function(position) {
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

      return {
        getLocation: _getCurrentGeoLocation,
        getCurrenAddress: _getCurrentAddress,
        getAddressByType: _getAddressByType
      };
    }
  ]);
});