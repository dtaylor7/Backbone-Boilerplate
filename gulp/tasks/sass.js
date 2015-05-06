var colors = require('colors');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

gulp.task('sass', function(){

  var files = ['source/**/*.sass', '!source/**/_*.sass'];

  console.log(colors.cyan("Compiling sass"));

  return gulp.src(files, {base: "source"})
  .pipe(sourcemaps.init())
  .pipe(sass({
    errLogToConsole: true,
    sourceComments: 'normal'
  }))
  .pipe(sourcemaps.write())
  .on('error', function(error){
    console.log(error.message); 
  })
  .pipe(rename(function(path){
    
    path.dirname = path.dirname.replace("sass", "css");
    // Renames output .sass file with timestamp (cache-bust)
    // path.basename += "." + currDate;
  }))
  .pipe(gulp.dest('source'))
  .pipe(livereload({silent: true}));

});
