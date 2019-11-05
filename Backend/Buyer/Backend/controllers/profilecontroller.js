var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var {Buyer} = require('.././models/buyer_signup');
var kafka = require('../kafka/client');

module.exports.profile = function(req,res) {
    // var email = req.body.email;
    // var sql = "SELECT * FROM buyer_signup WHERE email='"+email+"'";
    // console.log(sql);    
    // console.log("hi")
    // Buyer.findOne({email : req.body.email}, function (err, result) {
    //     console.log("inside profilecontroller query")
    //         if (err) {
    //             console.log(err)
    //             res.status(400).json({
    //                     data: err,
    //                     message: 'No active orders'});
    //         }
    //          else{
                
    //                 console.log(result);
    //                 res.status(200).json({
    //                                 data: result,
    //                                 message: 'Success'});

    //             }
    //     });

    kafka.make_request('buyer_profile', req.body, function (err, result) {
            console.log("inside profilecontroller query")
                if (err) {
                    console.log(err)
                    res.status(400).json({
                            data: err,
                            message: 'Error'});
                }
                 else{
                    
                        console.log(result);
                        res.status(200).json({
                                        data: result,
                                        message: 'Success'});
    
                    }

            });
    }