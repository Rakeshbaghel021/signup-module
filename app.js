var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var uploadRouter = require('./routes/api/upload');

var app = express();

// connect to mongoose database

mongoose.connect("mongodb://localhost/signup-module",{
 useNewUrlParser: true,
 useUnifiedTopology: true
},(err)=>{
    if(err) console.log(err);
    else console.log("connected to DataBase");
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config");
  const compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

app.use('/', indexRouter);
app.use('/api/v1/users',usersRouter);
app.use('/api/v1/upload', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if(err) {
    res.status(500).json({success: false, msg:"Something went wrong"})
    console.log(err)
  }
});

module.exports = app;
