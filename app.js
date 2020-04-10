const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');
//const fileUpload = require('express-fileupload');
const logger = require('./config/winston');
const usersRouter = require('./routes/usersRouter');
const tipsRouter = require('./routes/tipsRouter');
const tipRouter = require('./routes/tipRouter');
const indexRouter = require('./routes/indexRouter');
const healthRouter = require('./routes/healthRouter');
const hbs  = require('express-handlebars');

const app = express();

app.use(cors());
app.use(morgan("combined", { "stream": logger.stream }));

// view engine setup
app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout.hbs', 
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// enable files upload
//app.use(fileUpload({
//  createParentPath: false
//}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api/tips', tipsRouter);
app.use('/api/users', usersRouter);
app.use('/health', healthRouter);
app.use('/tip', tipRouter);
app.use('/', indexRouter);

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
  res.render('error', {title: 'Error', message: err.message});
});

module.exports = app;
