const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');
const logger = require('./config/winston');
const usersRouter = require('./routes/usersRouter');
const tipsRouter = require('./routes/tipsRouter');

const app = express();

app.use(cors());
app.use(morgan("combined", { "stream": logger.stream }));
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

// enable files upload
app.use(fileUpload({
  createParentPath: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api/tips', tipsRouter);
app.use('/api/users', usersRouter);

express.Router().get('/',function(req,res){
  //__dirname : resolves to project folder.
  res.sendFile(path.join(__dirname + '/index.html'));
});

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
