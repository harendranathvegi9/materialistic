/*global define*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.factory('WordpressService', ['$q', '$http',
    function($q, $http) {
      var _wpApiUrl = 'https://public-api.wordpress.com/rest/v1.1';
      var _endpoints = {
        fresh: '/freshly-pressed/',
        batch: '/batch/',
        posts: '/sites/$site/posts'
      };

      var _limits = {
        fresh: 40,
        posts: 100
      };

      var _encodeQueryData = function(data) {
        var ret = [];
        _.each(data, function(value, key) {
          ret.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        });
        return ret.join("&");
      };

      var _getFreshlyPressed = function(limit) {
        limit = limit || _limits.fresh;
        return $http.get(_wpApiUrl + _endpoints.fresh, {
          params: {
            number: limit
          }
        });
      };

      var _getLatestFollowed = function(limit, siteList) {
        limit = limit || _limits.posts;
        var batchParams = _generateBatchUrl(_endpoints.posts, siteList, {
          number: limit,
          meta: 'site'
        });
        console.log(decodeURIComponent($.param(batchParams)));
        return $http.get(_wpApiUrl + _endpoints.batch + '?' + decodeURIComponent($.param(batchParams)));
      };

      var _generateBatchUrl = function(endpoint, siteList, params) {
        var batchParams = {
          urls: []
        };
        _.each(siteList, function(site) {
          var siteParams = _encodeQueryData(params);
          var siteName = endpoint.split('$site').join(site);
          batchParams.urls.push(siteName + '?' + siteParams);
        });
        return batchParams;
      };

      return {
        getFresh: _getFreshlyPressed,
        getFollowed: _getLatestFollowed
      };
    }
  ]);
});