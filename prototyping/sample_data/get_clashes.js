var _ = require('underscore');
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/wessex", function(err, db) {

  if (err) {
    console.log(err);
    return;
  }

  var collection = db.collection('wessex_ipo');

  collection.aggregate([{
    $group: {
      _id: {
        "delivery_year": "$delivery_year",
        "location": "$location"
      },
      "matches": {
        $push: {
          "asset_id": "$asset_id",
          "asset_discipline": "$asset_discipline",
          "asset_work_description": "$asset_work_description",
          "start_mileage": "$start_mileage",
          "end_mileage": "$end_mileage",
          "id" : "$_id",
          "delivery_year": "$delivery_year",
          "location": "$location"
        }
      },
      "matchesLength": {
        $sum: 1
      }
    }
  }, {
    $match: {

      "matchesLength": {
        $gt: 1
      }

    }
  }, {
    $project: {
      "_id": 0,
      "delivery_year": "$_id.delivery_year",
      "location": "$_id.location",
      "matches": "$matches"
    }
  }], function(err, response) {

    if (err) {
      console.log(err);
      return;
    }

    var classhes = [];

    _.each(response, function(group){

      _.each(group.matches, function(project){

        var project = _.clone(project);
        project.clashes = [];

        _.each(group.matches, function(projectCheck){

          if(project.id == projectCheck.id) return;

          if(project.start_mileage >= projectCheck.start_mileage && project.start_mileage <= projectCheck.end_mileage){

            project.clashes.push(_.clone(projectCheck));

          }else if(project.end_mileage >= projectCheck.start_mileage && project.end_mileage <= projectCheck.end_mileage){

            project.clashes.push(_.clone(projectCheck));

          }

        })

        if(project.clashes.length){
          classhes.push(project);
        }

      })

    })

    console.log('total clashes:', classhes.length);

    fs.writeFile(__dirname + '/found_clashes.json', JSON.stringify(classhes), function(err)
    {
      if(err) {
        console.log( err );
        return;
      }
      console.log("json file of clashes made!");
    });

  })

});