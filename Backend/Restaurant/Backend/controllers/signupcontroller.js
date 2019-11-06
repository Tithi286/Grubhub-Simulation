var connection = require('../config');
var bcrypt = require('../bcrypt');
var { mongoose } = require('.././db/mongoose');
var { Restaurant } = require('.././models/res_signup');
var kafka = require('../kafka/client');

module.exports.signup = function (req, res) {
    var hashpassword;
    var restaurant = new Restaurant({
        "name": req.body.name,
        "email": req.body.email,
        "res_name": req.body.resname,
        "res_zipcode": req.body.zipcode,
        "password": req.body.password,
        "phone": req.body.phone,
        "cuisine": req.body.cuisine
    });
    console.log(restaurant)
    kafka.make_request('res_signup', req.body, function (err, result) {
        console.log('in result');
        if (err) {
            console.log("Inside err");
            res.status(403).json({
                success: false,
                message: "System Error, Try Again."
            })
        } else {
            if (Object.keys(result).length != 0) {
                console.log("else if")
                console.log(result)
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
