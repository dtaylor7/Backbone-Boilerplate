var colors = require('colors');
var gulp = require('gulp');
var _ = require('underscore');
var Tabletop = require('tabletop');
var fs = require('fs');

gulp.task('cache-data', function(){

   var url = "https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1HO3ZkhqUrbsVyoRaNvdMoiHySpd5pDrJBdq6pRynxvE&output=html";

   // fetch data from google sheets
  Tabletop.init({
    key: url,
    simpleSheet: true,
    callback: function(data, tabletop){

      var keys = _.keys(tabletop.models);

      var data = _.reduce(keys, function(object, key){

        object[key] = tabletop.models[key].elements;
        return object;

      }, {}, this);

      var cachedFile = 'source/data/cached.json';

      fs.writeFile(cachedFile, JSON.stringify(data), function(){
        console.log(colors.cyan("Wrote data to " + cachedFile));
      });

    },
  });


});
