var schema = require('./workbank_schema.json');
var _ = require('underscore');
var moment = require('moment');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var json2csv = require('json2csv');

var now = new Date();
var workbankdata = [];

var rowsOfData = 1000;

_.times(rowsOfData, function(){

  var project = _.clone(schema);

  _.each(project, function(value, key){

    if(_.isNumber(value[0])){

      project[key] = _.random(_.first(value), _.last(value))

    }else{

      project[key] = _.sample(value);

    }

  });

  var rand = _.random(0,999);
  project["start_mileage"] = rand;
  project["end_mileage"] = _.random(rand, _.random(rand, rand+10))+1;

  workbankdata.push(project);

});


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/wessex", function(err, db) {

  if(err){
    console.log(err);
    return;
  }

  var collection = db.collection('wessex_ipo');

  collection.remove({});

  collection.insert(workbankdata, {w:1}, function(err, result) {

    if(err){
      console.log(err);
      return;
    }

    console.log('inserted', workbankdata.length, 'rows successfully');

    process.exit(1);

  });


});

fs.writeFile(__dirname + '/sample_data.json', JSON.stringify(workbankdata), function(err)
{
  if(err) {
    console.log( err );
    return;
  }
  console.log("json file made!");
});

json2csv({ data: workbankdata, fields: _.keys(_.first(workbankdata)) }, function(err, csv) {
  if (err) console.log(err);
  fs.writeFile(__dirname + '/sample_data.csv', csv, function(err)
  {
    if(err) {
      console.log( err );
      return;
    }
    console.log("csv file made!");
  });
});
