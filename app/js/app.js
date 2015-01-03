/*global define*/
define([
  'angular',
  'jquery',
  'angularroute',
  'angularsanitize',
  'angularanimate',
  'angulararia',
  'angularmaterial',
  'underscore',
  './modules'
], function(angular) {
  var myApp = angular.module('myApp', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'ngMaterial',
    //'myApp.filter',
    //'myApp.provider',
    //'myApp.service',
    //'myApp.directive',
    'myApp.controller'
  ]);
  return myApp;
});