var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');

//connect database
var config = require('./config/db');
var FacebookStrategy = require('passport-facebook').Strategy;

//config passport
require('./config/passport')(passport);
require('./config/passportFB')(passport);

// require module 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fbRouter = require("./routes/fb");

var app = express();


mongoose.Promise = global.Promise;
mongoose.connect(config.getConnectionString()).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// set up route
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', fbRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//
module.exports = app;