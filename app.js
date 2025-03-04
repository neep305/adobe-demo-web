var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postbackRouter = require('./routes/postback');
var mixpanelRouter = require('./routes/mixpanel');
var encryptRouter = require('./routes/encrypt');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Accept-CH', 'sec-ch-ua-model,sec-ch-ua-platform-version,sec-ch-ua-full-version-list');
  res.setHeader('Permissions-Policy', 'ch-ua-model=("https://sdk-api-v1.singular.net"),ch-ua-platform-version=("https://sdk-api-v1.singular.net"),ch-ua-full-version-list=("https://sdk-api-v1.singular.net")');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/postback', postbackRouter);
app.use('/mixpanel', mixpanelRouter);
app.use('/encrypt', encryptRouter);

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
