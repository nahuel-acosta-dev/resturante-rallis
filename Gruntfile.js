module.exports = function (grunt){
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "static/css",
                    src: ["*.scss"],
                    dest: "static/css",
                    ext: ".css"
                }]
            }
        },
        watch: {
            files: ["static/css/*.scss"],
            task: ["css"],
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'static/css/*.css',
                        '*.html',
                        'static/images/**.*',
                        'static/js/*.js'
                    ]
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: 'static/images/*.{png,jpg,jpeg,gif}',
                    dest: 'dist/'
                }]
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },

        cssmin: {
            dist: {}
        },

        uglify: {
            dist: {}
        },

        filerev: {
            options: {
              encoding: 'utf8',
              algorithm: 'md5',
              length: 20
            },
          },

        concat: {
            options: {
                separator: ';'
            },
            dist: {},
        },
        filerev: {
            images: {
              src: 'dist/images/**.*'
            }
          },
          filerev_usemin: {
            dist: {
              src: '*.html'
            },
            activities: {
              options: {
                root: 'dist'
              },
              dist: {
                src: 'dist/*.html'
              }
            }
          },
        useminPrepare: {
            foo:{
            dest: 'dist',
            src: ['index.html', 'precios.html', 'about.html', 'contactos.html'],
            },
            options: {
              flow: {
                steps: {
                  css: ['cssmin'],
                  js: ['uglify']
                },
                post: {
                  css: [{
                    name: 'cssmin',
                    createConfig: function (context, block) {
                      var generated = context.options.generated;
                      generated.options = {
                        KeepSpecialComments: 0,
                        rebase: false
                      }
                    }
                  }]
                }
              }
            }
          },
          usemin: {
              html: ['dist/index.html', 'dist/about.html', 'dist/contactos.html', 'dist/precios.html'],
              options: {
                  assetsDir: ['dist', 'dist/static/css', 'dist/static/js']
              }
          }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-filerev-usemin');
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin',
        'filerev',
        'filerev_usemin'
      ]);

};