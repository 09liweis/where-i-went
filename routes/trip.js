var express = require('express');
var router = express.Router();
var Trip = require('../models/trip.js');

/* GET home page. */
router.get('/', function(req, res) {
    Trip.find({}, function(err, trips) {
        if (err) {
            res.send(err);
        } else {
            res.send(trips);
        }
    });
});


router.post('/new', function(req, res) {
    var trip = new Trip();
    trip.name = req.body.name;
    trip.save(function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            res.send(trip);
        }
    });
});

router.put('/:id', function(req, res) {
    var id = req.params.id;
    Trip.findOne({_id: id}, function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            trip.name = req.body.name;
            trip.save(function(err, trip) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(trip);
                }
            });
        }
    });
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Trip.findOneAndRemove({_id: id}, function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send();
        }
    });
});

module.exports = router;