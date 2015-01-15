/*global define*/
define(['./app'], function(app) {
  app
    .config(['localStorageServiceProvider',
      function(localStorageServiceProvider) {
        localStorageServiceProvider
          .setPrefix('materialisticMe')
          .setNotify(true, true);
      }
    ]);
});