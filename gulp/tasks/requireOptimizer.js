var gulp = require('gulp');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

gulp.task('requirejsBuild', function() {

  rjs({
      baseUrl: 'frontend/root/js',
      mainConfigFile: 'frontend/config.js',
      out: 'all.js',
      name: '../init',
      findNestedDependencies: true,
      paths: {
        "root": ".",
        "templates": "../templates",
        "views": "views",
        "models": "models",
        "data": "../data",
        "modules": "../../modules",
        "widgets": "../../widgets",
        "helpers": "helpers"
      }
    })
  .pipe(uglify({compress: true}))
  .pipe(gulp.dest('build/js/')); // pipe it to the output DIR 

});