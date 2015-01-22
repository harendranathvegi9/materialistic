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
            [6, 9, {
              msg: 'Good morning',
              id: 1
            }],
            [10, 11, {
              msg: 'Good morning',
              id: 2
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

      var _convert = function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
          d.constructor === Date ? d :
          d.constructor === Array ? new Date(d[0], d[1], d[2]) :
          d.constructor === Number ? new Date(d) :
          d.constructor === String ? new Date(d) :
          typeof d === "object" ? new Date(d.year, d.month, d.date) :
          NaN
        );
      };
      var _compare = function(a, b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
          isFinite(a = this.convert(a).valueOf()) &&
          isFinite(b = this.convert(b).valueOf()) ?
          (a > b) - (a < b) :
          NaN
        );
      };

      var _inRange = function(d, start, end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
          isFinite(d = this.convert(d).valueOf()) &&
          isFinite(start = this.convert(start).valueOf()) &&
          isFinite(end = this.convert(end).valueOf()) ?
          start <= d && d <= end :
          NaN
        );
      };

      var _getFormatedDate = function(date) {
        var day = date || new Date();
        var dd = day.getDate();
        var mm = day.getMonth() + 1; //January is 0!

        var yyyy = day.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        return mm + '/' + dd + '/' + yyyy;
      };

      return {
        greeting: _timeBasedGreeting,
        ordinal: _getOrdinal,
        compare: _compare,
        inRange: _inRange,
        convert: _convert,
        formattedDate: _getFormatedDate
      };
    }
  ]);
});