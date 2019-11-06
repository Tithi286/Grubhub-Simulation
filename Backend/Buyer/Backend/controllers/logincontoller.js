var connection = require('../config');
var bcrypt = require('../bcrypt');
var express = require('express');
var app = express();
var config = require('../config/settings');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var { mongoose } = require('.././db/mongoose');
var { Buyer } = require('.././models/buyer_signup');
var passportauth = passport.authenticate('jwt', { session: false });
app.use(passport.initialize());
require('../config/passport')(passport);

var kafka = require('../kafka/client');

module.exports.login = function (req, res) {
    var buyerlogin = {
        "email": req.body.email,
        "password": req.body.password

    }

    kafka.make_request('buyer_login', req.body, function (err, results) {

        if (err) {
            res.status(401).json({
                data: err,
                message: 'error.'
            });
        }
        else if (results != null) {
            console.log("loginresults" + results)
            console.log("connection established");

            var token = jwt.sign(buyerlogin, config.secret, {
                expiresIn: 60 * 60 * 1000
            });
            console.log(token)
            req.session.user = buyerlogin.email;
            console.log(req.session.user);

            res.json({
                status: 200,
                data: results,
                token: 'JWT ' + token,
                message: 'user fetched sucessfully',
            })
            console.log(results)




        }
        else {
            console.log("no data");
            res.status(200).json({
                status: 201,
                data: "Email does not match",
                message: 'Email does not match.'
            });

        }

    });


}
