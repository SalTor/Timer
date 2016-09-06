module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                loadPath: require('node-bourbon').includePaths,
                trace: true
            },
            dev: {
                options: {
                    style: 'expanded'
                },
                files: [
                    {'./public/build/css/index.css': './development/scss/index.scss'}
                ]
            },
            release: {
                options: {
                    style: 'compressed'
                },
                files: [
                    {'./public/build/css/index.css': './development/scss/index.scss'}
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
                src: './public/build/css/index.css'
            }
        },
        notify: {
            build: {
                options: {
                    title: 'Timer App',
                    message: 'Grunt tasks finished'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        './public/build/js/*.js',
                        './public/build/css/*.css',
                        './index.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        },
        uglify: {
            options: {
                mangle: false,
                enclose: {}
            },
            dev: {
                files: {
                    './public/build/js/timer.js': [
                        './node_modules/jquery/dist/jquery.min.js',
                        './development/js/index.js',
                        './development/js/mousetrap.min.js'
                    ]
                },
                options: {
                    sourceMap: true
                }
            },
            release: {
                files: {
                    './public/build/js/timer.js': [
                        './node_modules/jquery/dist/jquery.min.js',
                        './development/js/index.js',
                        './development/js/mousetrap.min.js'
                    ]
                },
                options: {
                    compress: {
                        drop_console: true,
                        unused: true,
                        warnings: true
                    }
                }
            }
        },
        watch : {
            stylesheets: {
                files: ['./development/scss/*.scss', './development/scss/**/*.scss'],
                tasks: ['sass:dev', 'postcss', 'notify']
            },
            javascript: {
                files: ['./development/js/*.js', './development/js/**/*.js'],
                tasks: ['uglify:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('build',   ['base', 'notify']);
    grunt.registerTask('default', ['base', 'notify', 'browserSync', 'watch']);
    grunt.registerTask('base',    ['sass:dev', 'uglify:dev', 'notify']);
    grunt.registerTask('release', ['sass:release', 'postcss', 'uglify:release', 'notify']);
};
