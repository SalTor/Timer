module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass : {
            dist : {
                options : {
                    style : 'compressed',
                    update : true,
                    trace: true,
                    loadPath: require('node-bourbon').includePaths
                },
                files : [
                    {'stylesheets/index.css': 'development/scss/index.scss'}
                ]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'stylesheets/index.css'
            }
        },
        notify: {
            build: {
                options: {
                    title: '',
                    message: 'Grunt tasks finished'
                }
            }
        },
        watch : {
            stylesheets: {
                files: ['development/scss/*.scss', 'development/scss/**/*.scss'],
                tasks: ['sass', 'postcss', 'notify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('build',   ['base', 'notify']);
    grunt.registerTask('default', ['base', 'notify', 'watch']);
    grunt.registerTask('base',    ['sass', 'postcss']);
};
