const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/authMiddleware');
const profileRouter = require('./routes/profileRoutes');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

//middleware
app.use(cors({ origin: true, credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


// view engine
app.set('view engine', 'ejs');


// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/Beacon', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.');
    } else {
        console.log('Error in DB connection: ' + err);
    }
});



//routes
app.use('/profile',requireAuth,profileRouter);
app.use(authRoutes);


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
  
});

module.exports = app;
