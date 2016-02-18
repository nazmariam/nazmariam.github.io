module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
          files: ['js/*.js']
        },
        concat: {
            options:{
            separetor: ';'
          },
            basic_and_extras: {
              files: {
                'js/script.main.js': ['js/*.js'],
                'css/style.main.css': ['css/*.css']
              },
            },
          },
        uglify: {
          my_target: {
            files: {
               'js/script.main.min.js': ['js/script.main.js']
            }
          }
        },
            cssmin: {
              options: {
                shorthandCompacting: false,
                roundingPrecision: -1
              },
              target: {
                files: {
                  'css/style.main.min.css': 'css/style.main.css'
                }
              }
            }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default',['concat']);
    grunt.registerTask('default',['uglify']);
    grunt.registerTask('default',['cssmin']);

};