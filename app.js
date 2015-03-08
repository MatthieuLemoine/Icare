var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession= require('express-session');
var http=require('http');
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
require('./models/Users');
require('./models/Markers');

var routes = require('./routes/index');

var app = express();
app.set('port', 3000);

function htmlEscape(text) {
   return text.replace(/&/g, '&amp;').
     replace(/</g, '&lt;').  // it's not neccessary to escape >
     replace(/"/g, '&quot;').
     replace(/'/g, '&#039;');
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Authentification
app.use(expressSession({secret: 'Czxc4yaWzWNP'}));
app.use(passport.initialize());
app.use(passport.session());
 // Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());


// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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

http.createServer(app).listen(app.get('port'),function(){
    console.log('Server http running on port '+app.get('port'));
});
