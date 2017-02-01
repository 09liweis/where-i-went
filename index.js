var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
if (process.env.C9_USER) {
    var mongodb = 'mongodb://' + process.env.IP + '/where_i_went';
} else {
    var mongodb = 'mongodb://heroku_rsqsx1tm:p03f8o6bbsj1km0gulchhnt5tl@ds139619.mlab.com:39619/heroku_rsqsx1tm';
}
mongoose.connect(mongodb, function(err) {
    if (err) {
        
    }
});

console.log(process.env);

var app = express();

app.set('port', (process.env.PORT || 5000));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: false}));

// use morgan to log requests to the console
app.use(morgan('dev'));

// Express Session
app.use(session({
    secret: 'seret',
}));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// routes
var pages = require('./routes/index');
var user = require('./routes/user');
var trip = require('./routes/trip');
var photo = require('./routes/photo');

app.use('/', pages);
app.use('/user', user);
app.use('/trip', trip);
app.use('/photo', photo);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


