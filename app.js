var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var Ehdokas = require('./models/ehdokas');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var ejs = require('ejs');
var findOrCreate = require("find-or-create");
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./models/user');
var session = require('express-session');
var auth = require('./routes/auth');
//var request = require('request');



var app = express();

 // force all traffic through https in production
                if (process.env.NODE_ENV === 'production') {
                    app.use((req, res, next) => {
                        if (!req.secure && req.get('X-Forwarded-Proto') !== 'https') {
                            if (req.method !== 'GET') {
                                res.status(404).send();
                            } else {
                                res.redirect(`https://${req.get('Host')}${req.url}`);
                            }
                        } else {
                            next();
                        }
                    });
                }

app.use(cookieParser());

var httpServer = http.createServer(app);


//Set up default mongoose connection
if (process.env.NODE_ENV == "production"){
	var mongoDB = 'mongodb://virtavesivaalit:KaksitoistaR3kkaa@gettingstarted-shard-00-00-1zvns.mongodb.net:27017,gettingstarted-shard-00-01-1zvns.mongodb.net:27017,gettingstarted-shard-00-02-1zvns.mongodb.net:27017/virtavaalit?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin&retryWrites=true';
}else{
	var certOptions = {
	  key: fs.readFileSync(path.resolve('./server.key')),
	  cert: fs.readFileSync(path.resolve('./server.crt'))
	}
	var httpsServer = https.createServer(certOptions, app);
	var mongoDB = 'mongodb://127.0.0.1/virtavaalit';
}

mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    console.log(user);
      if(!err) done(null, user);
      else done(err, null);
    });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register210418', usersRouter);
app.use('/auth', auth);


//app.get('/auth/facebook', passport.authenticate('facebook'));

/*app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/moi',
                                      failureRedirect: '/hei' }));*/

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


if(process.env.NODE_ENV == "production"){
	httpServer.listen(process.env.PORT || 8080);
}else{
	httpsServer.listen(8443);
}


module.exports = app;
