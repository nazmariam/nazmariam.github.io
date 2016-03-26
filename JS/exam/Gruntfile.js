module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: { 
            dist: {
                src: [ ''],
                dest: ''
            }
        },

        // cssmin: {
        //     dist: {
        //         src: 'styles/style.css',
        //         dest: 'styles/style.min.css'
        //     }
        // },
        sass: {
            dist: {
              files: [{
                expand: true,
                cwd: 'styles',
                src: ['*.scss'],
                dest: 'styles',
                ext: '.css'
              }]
             }
        },
        watch: {
             sass: {
               files: 'styles/*.scss',
               tasks: ['sass'],
               
             },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'cssmin']);

};