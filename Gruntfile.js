'use strict';

module.exports = function(grunt) {
  //
  // Project configuration.
  //
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/styles/main.css': 'app/src/styles/main.scss'
        }
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: {
          "app/default.html":             "app/src/views/default.jade",
          "app/views/partials/main.html": "app/src/views/partials/main.jade"
        }
      }
    }
  });

  //
  // Load the plugins.
  //
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');

  //
  // Default task(s).
  //
  grunt.registerTask('default', ['jade', 'sass']);
};
