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
          'app/styles/main.css': ['app/src/styles/main.scss'],
          'app/styles/font-awesome.min.css': ['app/src/styles/font-awesome/font-awesome.scss'],
          'app/styles/components.css': ['app/src/styles/components.scss']
        }
      }
    },

    pug: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: [
          {
            dest: "app/default.html",
            src:  "app/src/views/default.pug"
          },
          {
            expand: true,
            dest: "app/views/partials/",
            ext: ".html",
            src:  "*.pug",
            cwd:  "app/src/views/partials"
          }
        ]
      }
    }
  });

  //
  // Load the plugins.
  //
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-sass');

  //
  // Default task(s).
  //
  grunt.registerTask('default', ['pug', 'sass']);
};
