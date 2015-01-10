/*global define*/
define(['./module'], function(filterModule) {
  filterModule.filter('iconFilter', [
    function() {
      return function(input, size) {
        var iconType = input.split(' ').join('_');
        return 'img/icons/ic_' + iconType + '_' + size + 'px.svg';
      };
    }
  ]);
});