var Feed = require('../models/feed');
var _ = require('underscore');

var router = function(app) {
  app.post('/sos', function(req, res) {
    // error checking
    req.assert('lat', 'required').isFloat();
    req.assert('lng', 'required').isFloat();
    req.assert('name', 'required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      return res.json({errors: errors}, 400);
    }

    // check for dupes
    var query = {name: req.body.name, loc: [req.body.lat, req.body.lng], state: Feed.STATE_OPEN};
    Feed.findOne(query, function(err, feed) {
      if (!err && feed) {
        // dupe found
        return res.json({errors: [{msg:'entry already exists.'}]}, 400)
      } else {
        // no dupe found, create a new entry
        var feedData = {name: req.body.name, loc: [req.body.lat, req.body.lng], address: req.body.address};
        var feed = new Feed(feedData);
        feed.save(function(err, savedFeed){
          if (!err && savedFeed) {
            return res.json(savedFeed.apiData());
          } else {
            return res.json({errors: [{msg:'could not create feed.', err: err}]}, 400)
          }
        });
      }
    })
  });

  app.post('/rescue', function(req, res) {
    // error checking
    req.assert('id', 'required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      return res.json({errors: errors}, 400);
    }

    Feed.findByIdAndUpdate(req.body.id, { $set: { state: Feed.STATE_CLOSED } }, null, function(err, feed){
      if (!err && feed) {
        return res.json(feed.apiData());
      } else {
        return res.json({errors: [{msg:'could not find or update feed.', err: err}]}, 400)
      }
    });
  });

  app.get('/feed', function(req,res) {
    req.assert('state').notEmpty().isValidState();

    var errors = req.validationErrors();
    if (errors) {
      return res.json({errors: errors}, 400);
    }

    var feedsFound = function(err, feeds) {
      if (!err && feeds) {
        var data = _.map(feeds, function(feed){return feed.apiData()});
        return res.json(data);
      } else {
        return res.json({errors: [{msg:'could find any feeds.', err: err}]}, 400)
      }
    };

    // check for location query
    if (req.query.near) {
      var coordinates = req.query.near.split(',', 1);
      // check for distance
      var distance = 1;
      if (req.query.distance) {
        distance = req.query.distance;
      }
      Feed.geoNear({ type : "Point", coordinates : coordinates }, 
                   { maxDistance : distance, spherical : true }, 
                   feedsFound);
    } else {
      // normal find all query
      Feed.find({state:req.query.state}, feedsFound);
    }
  })
};

module.exports = router;