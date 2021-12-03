'use strict';

  var gulp = require('gulp');
  var sass = require('gulp-sass')(require('sass'));
  var browserSync = require('browser-sync');
  var fel = require('del');
  var imagemin = require('gulp-imagemin');
  var uglify = require('gulp-uglify');
  var usemin = require('gulp-usemin');
  var rev = require('gulp-rev');
  var cleanCss = require('gulp-clean-css');
  var flatmap = require('gulp-flatmap');
  var htmlmin = require('gulp-htmlmin');
  
  
  gulp.task('sass', function () {
    return gulp.src('./static/css/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./static/css'));
  });

  gulp.task('sass:watch', function (){
      gulp.watch('./static/css/*.scss', ['sass']);
  });


 gulp.task('browser-sync', function(){
      var files = ['./*.html', './static/css/*.scss', './static/js/*.js', './static/image/*.{png, jpg, gif}'];
      browserSync.init(files, {
          server: {
              basedir: './'
          }
      });
  });

  gulp.task('default', ['browser-sync'], function(){
      gulp.start('sass:watch');
  });

  gulp.task('clean', function(){
      return del(['dist']);
  });

  gulp.task('imagemin', function(){
      return gulp.src('./static/images/*.{png,jpg,jpeg,gif')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist1/static/images'))
  });

  gulp.task('usemin', function(){
      return gulp.src('./*.html/')
        .pipe(flatmap(function(stram, file){
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function() {return htmlmin({collapseWhitespace: true})}],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleanCss(), 'concat']

                }));
        }))
        .pipe(gulp.dest('dist1/'))
  });

  gulp.task('build', ['clean', function(){
      qulp.start('imagemin', 'usemin');
  }]);