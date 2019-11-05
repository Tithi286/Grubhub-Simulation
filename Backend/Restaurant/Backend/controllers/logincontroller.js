var connection = require('../config');
var bcrypt = require('../bcrypt');
var express = require('express');
var app = express();
var config = require('../config/settings');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var { mongoose } = require('.././db/mongoose');
var passportauth = passport.authenticate('jwt', { session: false });
app.use(passport.initialize());
// Bring in defined Passport Strategy
require('../config/passport')(passport);
var {Restaurant} = require('.././models/res_signup');
var kafka = require('../kafka/client');

module.exports.login = function (req, res) {
    var reslogin = {
        "email": req.body.email,
        "password": req.body.password

    }

    // var sql = "SELECT * FROM res_signup WHERE email = '" +  reslogin.email + "'";
    // console.log(sql);

kafka.make_request('res_login', req.body, function (err, results) {
    if (err) {
            res.status(401).json({
                data: err,
                message: 'error.'
            });
    }
    else if(results != null){
                console.log("connection established");
                var token = jwt.sign(reslogin, config.secret, {
                    expiresIn: 60*60*1000 
                });
                req.session.user = reslogin.email;
                console.log(req.session.user);
                        
                res.json({
                    status: 200,
                    data: results,
                    token: 'JWT ' + token,
                    message: 'user fetched sucessfully'
                })
                
        }
    else{
        console.log("no data");
        res.status(200).json({
            status: 201,
            data: "Email does not match",
            message: 'Email does not match.'
        });
         
     }
    
    });
}