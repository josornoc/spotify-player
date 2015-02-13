'use strict';

module.exports = function(grunt) {

  // 1. All configuration goes here 
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        files: {
          'build/application.js': ['src/javascript/*.js']
        }
      }
    },
    sass: {
      dist: {
        files: {
         'build/main.css':'src/styles/main.scss'
        }
      }
    },
    processhtml: {
      dist: {
        options: {
          process: true,
          data: {
            title: 'My Angular app',
            message: 'This is production distribution'
          }
        },
        files: {
          'build/index.html': ['index.html']
        }
      }
    },
    copy: {
      main: {
        src: 'src/styles/*.css',
        dest: 'build/styles.css',
      }
    },
    'gh-pages': {
      options: {
          base: 'build'
      },
      src: ['**']
    },
    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
            spawn: false,
        }
      } 
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  //grunt.loadNpmTasks('grunt-contrib-concat');
  // Load the plugin tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  // grunt.registerTask('default', ['concat']);
  // Custom tasks
  grunt.registerTask('deploy', ['gh-pages']);
  grunt.registerTask('default', ['uglify','copy','processhtml','watch']);
};

