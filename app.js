var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var productRouter = require('./routes/products');
var wrouter = require('./routes/Wish');
var sessionauth = require("./middleware/sessionAuth");
const mongoose= require("mongoose");
const sessionAuth = require('./middleware/sessionAuth');

var app = express();
//session
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.use(sessionAuth);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/', userRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/wishs', wrouter);

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

mongoose.connect("mongodb+srv://hamza:1234@cluster0.kdzfc.mongodb.net/cluster0?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>{
  console.log("Connection to mongoDB Successfull");
}).catch((err)=>{
console.log("Connection error");
console.log(err);
});

module.exports = app;
