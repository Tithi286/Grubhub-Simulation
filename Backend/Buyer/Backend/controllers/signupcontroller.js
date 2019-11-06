var connection = require('../config');
var bcrypt = require('../bcrypt');
var { mongoose } = require('.././db/mongoose');
var { Buyer } = require('.././models/buyer_signup');
var kafka = require('../kafka/client');
module.exports.signup = function (req, res) {
    var hashpassword;
    var buyer = new Buyer({
        "fname": req.body.fname,
        "lname": req.body.lname,
        "email": req.body.email,
        "password": req.body.password,
        "phone": req.body.phone

    });

    kafka.make_request('buyer_signup', buyer, function (err, buyers) {
        console.log('in result');
        if (err) {
            console.log("Inside err");
            res.status(403).json({
                success: false,
                message: "System Error, Try Again."
            })
        } else {
            if (Object.keys(buyers).length != 0) {
                console.log("else if")
                res.status(200).json({
                    success: true,
                    message: "Success",
                });
            } else {
                console.log("else else")
                res.status(201).json({
                    success: false,
                    message: 'Buyer already exists'
                })
            }
            res.end();
        }

    });


}
