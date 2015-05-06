var _ = require('underscore');
var colors = require('colors');
var gulp = require('gulp');
var bower = require('bower');

gulp.task('bower', function(){

  bower.commands
  .install()
  .on('end', function (installed) {
    console.log(colors.cyan("Installed"), _.keys(installed));
  })
  .on('error', function (error) {
    console.log(colors.red("Error installing bower dependancies"));
    console.log(error);
  });


});