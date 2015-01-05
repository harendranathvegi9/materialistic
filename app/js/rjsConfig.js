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
    angularmaterial: 'vendor/angular-material',
    angularlocalstorage: 'vendor/angular-local-storage',
    underscore: 'vendor/underscore'
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
    angularmaterial: {
      deps: ['angular', 'angulararia']
    },
    angularlocalstorage: {
      deps: ['angular']
    },
    underscore: {
      exports: '_'
    }
  }
});