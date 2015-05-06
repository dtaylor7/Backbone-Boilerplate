var gulp = require('gulp');
var colors = require('colors');
var fs = require('fs');
var uglify = require('gulp-uglify');
var minifyCSS = require("gulp-minify-css");
var rjs = require('gulp-requirejs');
var exec = require('child_process').exec;
var clean = require('gulp-clean');
var mkdirp = require('mkdirp');
var gcallback = require('gulp-callback');
var currDate = new Date().getTime();

gulp.task('clean', function(){
  return gulp.src('www', {read: false})
    .pipe(clean());
});

gulp.task('require', ["clean", "index"], function(done){

  return rjs({
      baseUrl: 'source',
      mainConfigFile: 'source/config.js',
      out: 'all.js',
      name: 'init',
      findNestedDependencies: true
    })
    .pipe(uglify({compress: true}))
    .pipe(gulp.dest('www/js/'))
    .pipe(gcallback(done));

});

gulp.task("index", ["clean"], function(done){

  mkdirp('www', function(err) {});

  // Edit and move the index.html file...
  fs.readFile("source/index.html", {encoding: 'utf8'}, function (err, data) {
    if (err) throw err;

    var index = data;

    // add cachebuster bits
    index = index.replace("urlArgs: null", "urlArgs: \""+currDate+"\"");
    index = index.replace("css/all.css", "css/all.css?"+currDate);

    var devMain = 'data-main="init"';
    var liveMain = 'data-main="js/all"';

    // Change init to all...
    index = index.replace(devMain, liveMain);

    fs.writeFile('www/index.html', index, function(err){
      if (err) throw err;
      done();
    });

  });

});

gulp.task('build', ["sass", "clean", "require", "index"], function(done){

  // Copy folders/files
  gulp.src([
      'source/images/**/*.*',
      'source/templates/**/*.*',
      'source/data/**/*.*',
      'source/css/**/*.*',
      'source/lib/requirejs/require.js'
    ], { base: './source/' })
    .pipe(gulp.dest('www'))
    .on('end', function(){
      done();
      process.exit(0);
    });

});