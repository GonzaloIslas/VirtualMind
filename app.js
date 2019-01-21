var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var currencyRouter = require('./routes/currency');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


//DB

var mongoose = require('mongoose');
var port = 3700;

//pasword del admin UufWXMNDSVwzmVSg

mongoose.connect("mongodb://admin:UufWXMNDSVwzmVSg@bd2-shard-00-00-az5yp.mongodb.net:27017,bd2-shard-00-01-az5yp.mongodb.net:27017,bd2-shard-00-02-az5yp.mongodb.net:27017/Prueba_Trabajo?ssl=true&replicaSet=BD2-shard-0&authSource=admin&retryWrites=true",{useNewUrlParser: true});


//DB

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', currencyRouter);
app.use('/users', usersRouter);

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

module.exports = app;
