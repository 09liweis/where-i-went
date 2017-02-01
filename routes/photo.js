var express = require('express');
var router = express.Router();
var Photo = require('../models/photo.js');

router.get('/', function(req, res) {
    var user = req.session.user;
    Photo.find({user: user._id}, function(err, photos) {
        if (err) {
            res.send(err);
        } else {
            res.send(photos);
        }
    });
});

router.post('/new', function(req, res) {
    var user = req.session.user;
    var photo = new Photo();
    photo.url = req.body.url;
    photo.title = req.body.title;
    photo.alt = req.body.alt;
    photo.description = req.body.description;
    photo.user = user._id;
    
    photo.save(function(err, photo) {
        if (err) {
            res.send(err);
        } else {
            res.send(photo);
        }
    });
});

module.exports = router;