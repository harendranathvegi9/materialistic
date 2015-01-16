/*global define*/
define([
  'angular',
  'jquery',
  'waves',
  'materialize',
  'angularroute',
  'angularsanitize',
  'angularanimate',
  'angulararia',
  'angularlocalstorage',
  './modules'
], function(angular) {
  var materialisticMe = angular.module('materialisticMe', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'ngAria',
    'LocalStorageModule',
    'materialisticMe.filter',
    //'materialisticMe.provider',
    'materialisticMe.service',
    'materialisticMe.directive',
    'materialisticMe.controller'
  ]);
  return materialisticMe;
});