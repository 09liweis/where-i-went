var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('pages/index', 
    {
        title: 'Where I Went',
        menu: 'home',
    }
    );
});

router.get('/about', function(req, res) {
    res.render('pages/about', 
    {
        title: 'Where I Went - About',
        menu: 'about',
    }
    );
});

module.exports = router;