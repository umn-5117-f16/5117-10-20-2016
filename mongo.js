var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://5117user:5117pass@ds041526.mlab.com:41526/maxharp3r-testingdb';

var db;

var connect = function(callback) {
  if (db) {
    callback(err, db)
  } else {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to mongodb");

      callback(err, db)
    });
  }
}

module.exports.connect = connect
