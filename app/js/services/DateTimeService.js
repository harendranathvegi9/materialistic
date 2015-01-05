/*global define*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.factory('DateTimeService', [

    function() {
      var _timeBasedGreeting = function() {
        var data = [
            [0, 11, "Good morning"], //It is always better to use an array
            [12, 17, "Good afternoon"], //to save data
            [18, 24, "Good evening"]
          ],
          hr = new Date().getHours();

        for (var i = 0; i < data.length; i++) {
          if (hr >= data[i][0] && hr <= data[i][1]) {
            return data[i][2];
          }
        }

        return 'Hi!';
      };
      var _getOrdinal = function(n) {
        if ((parseFloat(n) === parseInt(n)) && !isNaN(n)) {
          var s = ["th", "st", "nd", "rd"],
            v = n % 100;
          return (s[(v - 20) % 10] || s[v] || s[0]);
        }
        return '';
      };

      return {
        greeting: _timeBasedGreeting,
        ordinal: _getOrdinal
      };
    }
  ]);
});