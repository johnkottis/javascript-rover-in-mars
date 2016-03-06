module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        // Validate files with JSHint.
        jshint: {
            beforeUglify: ['Gruntfile.js', '*.js']
        },

        // Run unit tests.
       jasmine: {
           pivotal: {
               src: 'rover.js',
               options: {
                   specs: 'test/spec/rover.spec.js',
                   summary: true,
                   junit: {
                       path: 'junit'
                   }
               }
           }
       },

        // Minify files with UglifyJS.
        uglify: {
            options: {
                sourceMap: true,
                sourceMapName: 'sourceMap.map',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            buildCommon: {
                src: 'temp/scripts.js',
                dest: 'public/js/scripts.min.js'
            }
        },

        // Clean files and folders.
        clean: {
            temp: ['temp', 'junit', '_tests', 'sourceMap.map']
        },

    });

    grunt.registerTask('deploy', ['jshint', 'uglify', 'jasmine', 'clean']);
};