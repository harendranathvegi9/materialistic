/*global define*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.value('DefaultData', {
    wordpress: {
      enableFollowed: true,
      enableFresh: true,
      followedLimit: 1,
      freshLimit: 40,
      followedBlogs: ['wavesnsands.wordpress.com']
    },
    flipkart: {
      enableTop: true,
      enableDotd: true
    },
    user: {
      name: 'User'
    },
    app: {
      name: 'MaterialisticMe',
      author: 'Nisheed Jagadish',
      version: '0.0.1'
    },
    timestamp: null,
    dataExists: false
  });
});