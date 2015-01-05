/*global define*/
define([
  'angular',
  'jquery',
  'angularroute',
  'angularsanitize',
  'angularanimate',
  'angulararia',
  'angularmaterial',
  'angularlocalstorage',
  'underscore',
  './modules'
], function(angular) {
  var materialisticMe = angular.module('materialisticMe', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'ngMaterial',
    'LocalStorageModule',
    //'materialisticMe.filter',
    //'materialisticMe.provider',
    'materialisticMe.service',
    'materialisticMe.directive',
    'materialisticMe.controller'
  ]);
  return materialisticMe;
});