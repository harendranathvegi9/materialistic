/*global define*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.factory('DateTimeService', [

    function() {
      var _timeBasedGreeting = function() {
        var data = [
            [0, 5, {
              msg: 'Good morning',
              id: 0
            }],
            [6, 11, {
              msg: 'Good morning',
              id: 1
            }],
            [12, 15, {
              msg: 'Good afternoon',
              id: 2
            }],
            [16, 18, {
              msg: 'Good evening',
              id: 3
            }],
            [19, 24, {
              msg: 'Good evening',
              id: 4
            }]
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