/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmHeader', ['$rootScope', '$window', '$interval', '$timeout', '$mdMedia', '$mdSidenav', 'DateTimeService',
    function($rootScope, $window, $interval, $timeout, $mdMedia, $mdSidenav,  DateTimeService) {
      return {
        replace: true,
        restrict: 'E',
        scope: {
          mmBg: '=?',
          mmSidePanel: '=?'
        },
        link: function(scope, element, attributes) {

          scope.mdTall = $mdMedia('gt-md');
          scope.mmBg = scope.mmBg || 1;
          scope.currentDateTime = new Date();
          scope.greetingMessage = DateTimeService.greeting();
          scope.dateOridinal = DateTimeService.ordinal(scope.currentDateTime.getDate());
          scope.searchActive = false;

          scope.toggleSettings = function() {
            $mdSidenav(scope.mmSidePanel)
              .toggle()
              .then(function() {
                //Addition functionality
              });
          };

          scope.toggleSearch = function() {
            scope.searchActive = !scope.searchActive;
            if (scope.searchActive === true) {

              element.addClass('mm-search-active');

              $timeout(function() {
                angular.element('.mm-header-search-form').css('display', 'flex');
                angular.element('.mm-header-search > input[type="text"]').focus();
                angular.element('.active-disable').css('display', 'none');
              }, 300, false);

            } else {

              element.removeClass('mm-search-active');
              angular.element('.mm-header-search-form').css('display', 'none');
              angular.element('.mm-header-search > input[type="text"]').blur();

              $timeout(function() {
                angular.element('.active-disable').css('display', 'block');
              }, 300, false);
            }
            return;
          };

          var timeInterval = $interval(function() {
            var dateTime = new Date();
            scope.currentDateTime = dateTime;
            scope.dateOridinal = DateTimeService.ordinal(dateTime.getDate());
          }, 1000);


          /*Watch*/
          var unWatchMmBg = scope.$watch('mmBg', function(value, old) {
            if (value !== old) {
              element.removeClass('mm-bg-' + old).addClass('mm-bg-' + value);
            } else {
              element.addClass('mm-bg-' + value);
            }
          });

          /*Events*/
          var unbindResize = angular.element($window).on('resize', function() {
            scope.mdTall = $mdMedia('gt-md');
          });

          $rootScope.$on('Materialistic:CloseSideBar', function(e) {
            scope.toggleSettings();
          });

          /*Unbind*/
          scope.$on('$destroy', function() {
            unbindResize();
            unWatchMmBg();
            $interval.cancel(timeInterval);
          });
        },
        templateUrl: 'js/directives/mmHeader/mmHeader.html'
      };
    }
  ]);
});