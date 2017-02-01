var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Trip = require('../models/trip');

/* GET home page. */

router.get('/dashboard', function(req, res) {
    var user = req.session.user;
    
    if (user) {
        Trip.find({user: user._id}, function(err, trips) {
            if (err) {
                res.send(err);
            } else {
                res.render('pages/dashboard', 
                {
                    title: 'Dashboard',
                    menu: 'dashboard',
                    user: user,
                    trips: trips,
                });
            }
        });
    } else {
        res.redirect('/user/login');
    }
});

router.get('/login', function(req, res) {
    var user = req.session.user;
    if (user) {
        res.redirect('/dashboard');
    } else {
        res.render('pages/login',
        {
            title: 'Login',
            menu: 'login',
            user: '',
        }
        );
    }
});

router.get('/register', function(req, res) {
    res.render('pages/register',
    {
        title: 'Register',
        menu: 'register',
        user: ''
    }
    );
});

router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    
    var user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    
    user.save(function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        
        return res.status(200).send(user);
    });
    
});

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({email: email}, function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        
        if (!user) {
            return res.status(404).send('Not Found');
        }
        
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return res.status(500).send(err);
            }
            if (isMatch && isMatch == true) {
                req.session.user = user;
                return res.status(200).send(user);
            } else {
                return res.status(401).send('Password Not Correct');
            }
        });
    });
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/all', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.send(users);
        }
    });
});

module.exports = router;