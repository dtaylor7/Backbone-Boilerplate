var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
 
gulp.task('concatCSS', function () {
  gulp.src(['frontend/**/*.css', '!frontend/lib/**/*.css'])
    .pipe(concatCss("css/all.css"))    
  // .pipe(uglify({compress: true}))
    .pipe(gulp.dest('build/'));
});