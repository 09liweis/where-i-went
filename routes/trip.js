var express = require('express');
var router = express.Router();
var Trip = require('../models/trip.js');


router.get('/', function(req, res) {
    var user = req.session.user;
    Trip.find({user: user._id}, function(err, trips) {
        if (err) {
            res.send(err);
        } else {
            res.send(trips);
        }
    });
});


router.post('/new', function(req, res) {
    var user = req.session.user;

    var trip = new Trip();
    trip = createOrUpdate(trip, req);
    trip.user = user._id;

    trip.save(function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            Trip.find({user: user._id}, function(err, trips) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(trips);
                }
            });
        }
    });
});

router.put('/:id', function(req, res) {
    var user = req.session.user;

    var id = req.params.id;
    Trip.findOne({_id: id}, function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            trip = createOrUpdate(trip, req);

            trip.save(function(err, trip) {
                if (err) {
                    res.send(err);
                } else {
                    Trip.find({ user: user._id }, function(err, trips) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.status(200).send(trips);
                        }
                    });
                }
            });
        }
    });
});

router.delete('/:id', function(req, res) {
    var user = req.session.user;
    var id = req.params.id;
    Trip.findOneAndRemove({_id: id}, function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            Trip.find({ user: user._id }, function(err, trips) {
                if (err) {
                    res.send(err);
                } else {
                    res.status(200).send(trips);
                }
            });
        }
    });
});

function createOrUpdate(trip, req) {
    trip.name = req.body.name;
    trip.description = req.body.description;
    trip.address = req.body.address;
    trip.lat = req.body.lat;
    trip.long = req.body.long;
    trip.routes = req.body.routes;
    trip.photo = req.body.photo;
    
    return trip;
}

module.exports = router;