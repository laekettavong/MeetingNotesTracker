var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hjs');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
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


// ////for mongodb version 3.0 and up
// let MongoClient = require('mongodb').MongoClient;
// MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true } , function(err, client){
//    if(err) throw err;
   
//    let db = client.db('pizzia');
//    db.collection('person').find().toArray(function(err, result){
//      if(err) throw err;
//      console.log(result);
//      client.close();
//    });
// })

module.exports = app;
