var assert = require('assert')
var async = require('async')
var mongo = require('./mongo')
var Stopwatch = require('timer-stopwatch');

var stopwatch = new Stopwatch();

var startTimer = function(db, callback) {
  stopwatch.start()
  callback(null, db)
}

// demonstrate toArray
var findMessages = function(db, callback) {
  // db.messages.find({"username":"kjschiroo"})

  var filter = {
    'username': 'kjschiroo'
  }
  db.collection('messages').find(filter).toArray(function(err, docs) {
    assert.equal(null, err);

    console.log(docs)
    callback(null, db)
  });
}

// demonstrate a nested filter, `limit` and `each`
var findRestaurants = function(db, callback) {
  var filter = {
    'address.zipcode': '10075'
  }
  var count = 0
  db.collection('restaurants').find(filter).limit(10).each(function(err, doc) {
    assert.equal(null, err);
    count += 1

    if (doc) {
      console.log('%d doc: %s', count, doc.name)
    } else {
      callback(null, db)
    }

  });
}

// adding an index makes this query faster:
// db.restaurants.createIndex( { 'address.zipcode': 1 } )
// db.restaurants.dropIndex( { 'address.zipcode': 1 } )
var countRestaurants = function(db, callback) {
  var filter = {
    'address.zipcode': '10075'
  }
  var count = 0
  db.collection('restaurants').find(filter).count(function(err, count) {
    assert.equal(null, err);
    console.log('number of matching restaurants: %d', count)

    callback(null, db)
  });
}

// docs
// https://docs.mongodb.com/manual/meta/aggregation-quick-reference/
// https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#accumulators
var groupRestaurants = function(db, callback) {
  // db.restaurants.aggregate(
  //    [
  //      { $match: { "borough": "Queens", "cuisine": "Brazilian" } },
  //      { $group: { "_id": "$address.zipcode" , "count": { $sum: 1 } } }
  //    ]
  // );

  var pipeline = [
    { $match: { "borough": "Queens", "cuisine": "Brazilian" } },
    { $group: { "_id": "$address.zipcode" , "count": { $sum: 1 } } }
  ]

  // TODO: count by borough or cuisine
  // TODO: sort by count
  // TODO: limit to top-n

  db.collection('restaurants').aggregate(pipeline, function(err, result) {
    assert.equal(null, err);
    console.log('result: %s', JSON.stringify(result, null, 2))

    callback(null, db)
  });
}

async.waterfall([
  mongo.connect,
  startTimer,

  findMessages,
  // findRestaurants,
  // countRestaurants,
  // groupRestaurants,
], function (err, result) {
  console.log('done! took %d ms', stopwatch.ms)
  process.exit()
});
