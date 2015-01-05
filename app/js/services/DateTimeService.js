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
      return {
        greeting: _timeBasedGreeting
      };
    }
  ]);
});