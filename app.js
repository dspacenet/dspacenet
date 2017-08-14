var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

var index = require('./routes/index');
var users = require('./routes/users');
var new1 = require('./routes/new');
var wall = require('./routes/wall');
var friend = require('./routes/friend');
var send = require('./routes/send');
var global = require('./routes/global');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"este es mi secreto"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

app.use('/', index);
app.use('/users', users);
app.use('/prev', index);
app.use('/new', new1);
app.use('/wall', wall);
app.use('/logout', index);
app.use('/friend', friend);
app.use('/send', send);
app.use('/global', global);

app.use('/newwall', wall);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
