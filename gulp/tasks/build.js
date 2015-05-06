var gulp = require('gulp');
var colors = require('colors');
var fs = require('fs');
var uglify = require('gulp-uglify');
var minifyCSS = require("gulp-minify-css");
var clean = require("gulp-clean");

var currDate = new Date().getTime();

gulp.task('build', ["requirejsBuild", "concatCSS"], function(error){
	if (error) console.log(error);

	// Edit and move the index.html file...
	fs.readFile("frontend/root/index.html", {encoding: 'utf8'}, function (err, data) {
		if (err) throw err;

		var index = data;

		var devMain = 'data-main="init"';
		var liveMain = 'data-main="js/all"';

		// Change the environment variable to staging
		index = index.replace("development", "live");

		// Change require.js path...
		index = index.replace("..", "js");

		// Change init to all...
		index = index.replace(devMain, liveMain);

		fs.writeFile('build/index.html', index, function(err){
			if (err) throw err;
		});

    });

    // gulp.src('build', {read: false})
    //     .pipe(clean());

	// Copy images accross...
    gulp.src(['frontend/root/images/**'])
  	.pipe(gulp.dest('build/images'));

  	// Copy individual files and folders...
  	gulp.src(['frontend/config.js'])
	.pipe(uglify({
		compress: true,
		drop_console: true,
		DEBUG: false
	}))
	.pipe(gulp.dest("build/"));

  	gulp.src(['frontend/root/data/cached.json'])
	// .pipe(uglify({compress: true}))
	.pipe(gulp.dest("build/data/"));


  	gulp.src(['frontend/lib/requirejs/require.js'])
	.pipe(uglify({compress: true}))
	.pipe(gulp.dest("build/js/lib/requirejs/"));

	gulp.src(['build/css/all.css'])
	.pipe(minifyCSS())
	.pipe(gulp.dest("build/css/all.css"));

});