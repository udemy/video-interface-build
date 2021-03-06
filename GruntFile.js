module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            videojs: {
                files: {
                    'build/video-interface-build.min.js': [
                        'dest/video.js/dist/video-js/video.dev.js', 
                        'dest/videojs-resolution-selector/video-quality-selector.js', 
                        'dest/videojs-timer/lib/videojs-timer.js', 
                        'dest/videojs-speedcontroller/lib/videojs-speedcontroller.js',
                    ]
                },
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                }
            }
        },
        "bower-install-simple": {
            options: {
                color: true,
                directory: "../dest",
                cwd: "bower_components"
            },
            "prod": {
                options: {
                    production: true
                }
            }
        },
        less: {
          videojs: {
            files: {
              'intermediate/videojs-speedcontroller.css': 'dest/videojs-speedcontroller/lib/videojs-speedcontroller.less',
            }
          }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                sourceMap: true
            },
            target: {
                files: {
                    'build/video-interface-build.min.css': [
                        'dest/video.js/dist/video-js/video-js.css', 
                        'dest/videojs-resolution-selector/video-quality-selector.css',
                        'intermediate/videojs-speedcontroller.css',
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, flatten: true,  src: ['dest/video.js/dist/video-js/font/*'], dest: 'build/font'},
                    {expand: true, flatten: true,  src: ['dest/video.js/dist/video-js/lang/*'], dest: 'build/lang'},
                    {expand: true, flatten: true,  src: ['dest/video.js/dist/video-js/*.swf'], dest: 'build/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    // Default task(s).
    grunt.registerTask('default', ['bower-install-simple', 'uglify:videojs', 'less', 'cssmin', 'copy']);
};
