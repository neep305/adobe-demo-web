var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const admin = require('firebase-admin');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postbackRouter = require('./routes/postback');
var mixpanelRouter = require('./routes/mixpanel');
var encryptRouter = require('./routes/encrypt');
var productRouter = require('./routes/product');
var checkoutRouter = require('./routes/checkout');
var pushRouter = require('./routes/push');
var app = express();

// Firebase Admin SDK 초기화
// Heroku 환경에서는 환경 변수를 사용하고, 로컬에서는 서비스 키 파일을 사용
let firebaseConfig;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Heroku 환경: 환경 변수에서 JSON 파싱
    try {
        firebaseConfig = {
            credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
        };
        console.log('Firebase: 환경 변수로 초기화');
    } catch (error) {
        console.error('Firebase 환경 변수 파싱 에러:', error);
    }
} else if (fs.existsSync('./config/adobe-demo-app-service-key.json')) {
    // 로컬 환경: 서비스 키 파일 사용
    const serviceAccount = require('./config/adobe-demo-app-service-key.json');
    firebaseConfig = {
        credential: admin.credential.cert(serviceAccount)
    };
    console.log('Firebase: 로컬 서비스 키 파일로 초기화');
} else {
    console.warn('Firebase 초기화 실패: 환경 변수나 서비스 키 파일이 없습니다.');
}

if (firebaseConfig) {
    admin.initializeApp(firebaseConfig);
}

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
app.use('/product', productRouter);
app.use('/checkout', checkoutRouter);
app.use('/push', pushRouter);

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
