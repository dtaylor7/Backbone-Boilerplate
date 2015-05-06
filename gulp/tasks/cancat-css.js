var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');

gulp.task('concatCSS', function () {

  // .pipe(sass({
  //   errLogToConsole: true,
  //   sourceComments: 'normal'
  // }))

  gulp.src(['source/**/*.css', '!source/lib/**/*.css'])
    .pipe(concatCss("css/all.css"))
    .pipe(uglify({compress: true}))
    .pipe(gulp.dest('www/'));

});