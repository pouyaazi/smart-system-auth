var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const connection = require('./db');
connection.once('open', async () => {
  console.log('Database connected Successfully');
  //Init
  const Role=require('./models/role');
  const Admin=require('./models/admin');

  const adminRoll=await Role.findOneAndUpdate({
    title:'admin',
  },{
    title:'admin',
  },{
    new:true,
    upsert:true,
  }).exec();

  await Admin.findOneAndUpdate({
    username: 'admin',
  }, {
    password: 'admin',
    rollId: adminRoll._id,
  }, {
    new: true,
    upsert: true,
  }).exec();
});
connection.on('error', (err) => console.log('Error', err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/admin', require('./routes/admin'));
app.use('/api/v1/role', require('./routes/role'));
app.use('/api/v1/product', require('./routes/product'));

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
