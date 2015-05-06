var colors = require('colors');
var gulp = require('gulp');
var fs = require('fs');
var _ = require('underscore');

gulp.task('themes', function(){

  fs.readdir('frontend/widgets/themes/', function(err, files){

    console.log(colors.cyan("Reading directory"));

    if(err) throw err;

    var excluded = [".DS_Store", "master"];

    files = _.reject(files, function(file){
      return _.contains(excluded, file);
    });

    var data = _.map(files, function(file){

      var formatted = file.charAt(0).toUpperCase() + file.slice(1);
      formatted = formatted.replace("-", " ");

      return {
        name: file,
        formatted: formatted
      }

    });

    fs.writeFileSync('frontend/cms/data/themes.json', JSON.stringify(data), { encoding: "utf8" });

    console.log(colors.cyan("Exported to themes.json"));
    
  });

});
