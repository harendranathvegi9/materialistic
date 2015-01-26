/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    clean: {
      myApp: {
        src: ['./app/css', './app/js/vendor', './app/font'],
        options: {
          force: true
        }
      },
      js: {
        src: ['./app/js/myApp.js'],
        options: {
          force: true
        }
      },
      seed: {
        src: ['./app/css', './app/js/vendor', './app/font', './app/img'],
        options: {
          force: true
        }
      }
    },
    copy: {
      myApp: {
        files: [
          /*Angular copy*/
          {
            src: './bower_components/angular/angular.js',
            dest: './app/js/vendor/angular.js'
          }, {
            src: './bower_components/angular/angular-csp.css',
            dest: './app/css/angular-csp.css'
          }, {
            src: './bower_components/angular-route/angular-route.js',
            dest: './app/js/vendor/angular-route.js'
          }, {
            src: './bower_components/angular-sanitize/angular-sanitize.js',
            dest: './app/js/vendor/angular-sanitize.js'
          }, {
            src: './bower_components/angular-animate/angular-animate.js',
            dest: './app/js/vendor/angular-animate.js'
          }, {
            src: './bower_components/angular-aria/angular-aria.js',
            dest: './app/js/vendor/angular-aria.js'
          }, {
            src: './bower_components/angular-local-storage/dist/angular-local-storage.js',
            dest: './app/js/vendor/angular-local-storage.js'
          }, {
            src: './bower_components/angular-mocks/angular-mocks.js',
            dest: './app/js/vendor/angular-mocks.js'
          }, {
            src: './bower_components/angular-resource/angular-resource.js',
            dest: './app/js/vendor/angular-resource.js'
          },
          /*Hammer*/
          {
            src: './bower_components/hammerjs/hammer.js',
            dest: './app/js/vendor/hammer.js'
          },
          /*jquery*/
          {
            src: './bower_components/jquery/dist/jquery.js',
            dest: './app/js/vendor/jquery.js'
          },
          /*Require JS*/
          {
            src: './bower_components/requirejs/require.js',
            dest: './app/js/vendor/require.js'
          }, {
            src: './bower_components/almond/almond.js',
            dest: './app/js/vendor/almond.js'
          },
          /*underscore*/
          {
            src: './bower_components/underscore/underscore.js',
            dest: './app/js/vendor/underscore.js'
          },
          /*Materialize CSS*/
          {
            src: '**',
            dest: './app/css/',
            cwd: './bower_components/materialize/dist/css',
            expand: true
          },
          /*Waves*/
          {
            src: './bower_components/materialize/js/waves.js',
            dest: './app/js/vendor/waves.js'
          }, {
            src: './bower_components/velocity/velocity.js',
            dest: './app/js/vendor/velocity.js'
          }, {
            src: './bower_components/jquery.easing/js/jquery.easing.js',
            dest: './app/js/vendor/jquery.easing.js'
          }, {
            src: './bower_components/jquery.hammer.js/jquery.hammer.js',
            dest: './app/js/vendor/jquery.hammer.js'
          },{
            src: './bower_components/jquery-sticky/jquery.sticky.js',
            dest: './app/js/vendor/jquery.sticky.js'
          }
        ]
      },
      fonts: {
        files: [
          //FONTS
          {
            src: '**',
            dest: './app/font/',
            cwd: './bower_components/materialize/dist/font',
            expand: true
          }
        ]
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      materialize: {
        src: [
          './bower_components/materialize/js/cards.js',
          './bower_components/materialize/js/collapsible.js',
          './bower_components/materialize/js/dropdown.js',
          './bower_components/materialize/js/forms.js',
          './bower_components/materialize/js/leanModal.js',
          './bower_components/materialize/js/materialBox.js',
          './bower_components/materialize/js/parallax.js',
          './bower_components/materialize/js/sideNav.js',
          './bower_components/materialize/js/slider.js',
          './bower_components/materialize/js/tabs.js',
          './bower_components/materialize/js/toasts.js',
          './bower_components/materialize/js/tooltip.js'
        ],
        dest: './app/js/vendor/materialize.js',
      },
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        forin: true,
        freeze: true,
        immed: true,
        indent: 2,
        latedef: "nofunc",
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          angular: true,
          define: true,
          jQuery: true,
          $: true,
          require: true,
          console: true, //For Testing
          _: true
        },
        reporter: require('jshint-stylish')
      },
      myApp: ['./Gruntfile.js', './app/js/**/*.js']
    },
    less: {
      myApp: {
        files: [{
          src: './app/less/styles/style.less',
          dest: './app/css/styles.css'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['./app/js/**/*.js'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['./app/less/**/*.less'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    },
    connect: {
      myApp: {
        port: 9000,
        base: './app'
      }
    },
    requirejs: {
      js: {
        options: {
          baseUrl: './app/js',
          mainConfigFile: 'app/js/rjsConfig.js',
          deps: ['main', 'app', 'routes'],
          out: 'app/js/myApp.js',
          optimize: 'uglify2',
          name: './vendor/almond',
          preserveLicenseComments: false
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('firstrun', ['clean:myApp', 'copy:myApp', 'concat:materialize', 'copy:fonts']);
  grunt.registerTask('default', ['clean:js', 'jshint', 'less', 'requirejs', 'watch']);
  grunt.registerTask('seedcommit', ['clean:seed', 'clean:js']);
  grunt.registerTask('unit', ['karma:unit']);
};