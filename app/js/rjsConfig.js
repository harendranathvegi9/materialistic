/*Require JS configuration*/
/*global require*/
require.config({
  baseUrl: 'js',
  paths: {
    angular: 'vendor/angular',
    jquery: 'vendor/jquery',
    angularroute: 'vendor/angular-route',
    angularsanitize: 'vendor/angular-sanitize',
    angularanimate: 'vendor/angular-animate',
    angulararia: 'vendor/angular-aria',
    angularlocalstorage: 'vendor/angular-local-storage',
    underscore: 'vendor/underscore',
    hammerjs: 'vendor/hammer',
    waves: 'vendor/waves',
    velocity: 'vendor/velocity',
    jqueryeasing: 'vendor/jquery.easing',
    jqueryhammer: 'vendor/jquery.hammer',
    jquerysticky: 'vendor/jquery.sticky',
    materialize: 'vendor/materialize'
  },
  shim: {
    angular: {
      deps: ['jquery'],
      exports: 'angular'
    },
    angularroute: {
      deps: ['angular']
    },
    angularsanitize: {
      deps: ['angular']
    },
    angularanimate: {
      deps: ['angular']
    },
    angulararia: {
      deps: ['angular']
    },
    angularlocalstorage: {
      deps: ['angular']
    },
    underscore: {
      exports: '_'
    },
    hammerjs: {
      exports: 'Hammer'
    },
    waves: {
      deps: ['jquery', 'velocity', 'hammerjs', 'jqueryhammer', 'jqueryeasing']
    },
    materialize: {
      deps: ['jquery', 'velocity', 'hammerjs', 'jqueryhammer', 'jqueryeasing']
    },
    jquerysticky: {
      deps: ['jquery']
    }
  }
});