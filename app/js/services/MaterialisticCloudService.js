/*global define*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.factory('MaterialisticCloudService', ['$http',
    function($http) {
      var _apiURL = 'http://materialistic-njcould.rhcloud.com/';
      var _fkGetProductFeed = function() {
        return $http.get(_apiURL + 'api/flipkart/product/feed');
      };
      var _fkGetOffersDotd = function() {
        return $http.get(_apiURL + 'api/flipkart/offers/dotd');
      };
      var _fkGetOffersTop = function() {
        return $http.get(_apiURL + 'api/flipkart/offers/top');
      };

      return {
        api: {
          flipkart: {
            product: {
              feed: _fkGetProductFeed
            },
            offers: {
              top: _fkGetOffersTop,
              dotd: _fkGetOffersDotd
            }
          }
        }
      };
    }
  ]);
});