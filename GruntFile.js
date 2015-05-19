module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            videojs: {
                files: {
                    'build/video-interface-build.min.js': ['dest/video.js/dist/video-js/video.js', 'dest/videojs-resolution-selector/video-quality-selector.js', 'dest/videojs-timer/lib/videojs-timer.js', 'dest/videojs-tracking/lib/videojs-tracking.js']
                }
            }
        },
        "bower-install-simple": {
            options: {
                color: true,
                directory: "dest"
            },
            "prod": {
                options: {
                    production: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task(s).
    grunt.registerTask('default', ['bower-install-simple']);
    grunt.registerTask('default', ['uglify:videojs']);

};
