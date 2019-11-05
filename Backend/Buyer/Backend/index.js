//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
module.exports = app;
const fs = require('fs');
var signupcontroller=require('./controllers/signupcontroller');
var logincontroller=require('./controllers/logincontoller');
var homecontroller=require('./controllers/homecontroller');
var updateprofilecontroller=require('./controllers/updateprofilecontroller');
var profilecontroller=require('./controllers/profilecontroller');
var detailcontroller=require('./controllers/detailcontroller');
var placeorder=require('./controllers/placeorder');
var pastorders=require('./controllers/pastorders');
var upcomingorders=require('./controllers/upcomingorders');
var passportauth = passport.authenticate('jwt', { session: false })
app.use(passport.initialize());
require('./config/passport')(passport);
//use express session to maintain session data
app.use(session({
    secret              : 'grubhub',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Authorization, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.post('/signup',signupcontroller.signup);
app.post('/login',logincontroller.login);
app.post('/home',passportauth, homecontroller.home);
app.post('/filter',passportauth, homecontroller.filter);
app.post('/updatename',passportauth, updateprofilecontroller.updatename);
app.post('/updateemail',passportauth, updateprofilecontroller.updateemail);
app.post('/updatephone',passportauth, updateprofilecontroller.updatephone);
app.post('/profile',passportauth, profilecontroller.profile);
app.post('/detail',passportauth, detailcontroller.detail);
app.post('/placeorder',passportauth, placeorder.placeorder);
app.post('/pastorders',passportauth, pastorders.pastorders);
app.post('/upcomingorders',passportauth, upcomingorders.upcomingorders);
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001")