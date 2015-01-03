var allTestFiles = [
  'app/js/app',
  'app/js/routes'
];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  //console.log(window.__karma__.files);
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({

  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  paths: {
    angular: 'app/js/vendor/angular',
    jquery: 'app/js/vendor/jquery',
    angularroute: 'app/js/vendor/angular-route',
    angularsanitize: 'app/js/vendor/angular-sanitize',
    angularanimate: 'app/js/vendor/angular-animate',
    angulararia: 'app/js/vendor/angular-aria',
    angularmaterial: 'app/js/vendor/angular-material',
    angularmocks: 'app/js/vendor/angular-mocks',
    angularresource: 'app/js/vendor/angular-resource',
    underscore: 'app/js/vendor/underscore'
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
    angularmocks: {
      deps: ['angular']
    },
    angularresource: {
      deps: ['angular']
    },
    underscore: {
      exports: '_'
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});