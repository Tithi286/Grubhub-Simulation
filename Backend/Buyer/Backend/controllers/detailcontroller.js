var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var {Items} = require('.././models/res_items');
var {Restaurant} = require('.././models/res_signup');
var kafka = require('../kafka/client')

module.exports.detail = function(req,res) {  

    kafka.make_request('buyer_details', req.body, function (err, result) {
        console.log("search")
        if (result) {
            console.log(result)
            res.status(200).json({
                statusCode: 200,
                data: result,
                message: 'Success'
            });
        }
        else {
            console.log("else");
            console.log(err);
            res.status(400).json({
                statusCODE: 400,
                data: err,
                message: 'No items'
            });

        }
    });

    //kafka.make_request('buyer_home', req.body, function (err, result) {
    // Restaurant.find({res_name : req.body.res_name}, function (err, restaurant) {
    //     if (err) {
    //         console.log(err);
    //             res.status(400).json({
    //                             data: err,
    //                             message: 'No items'});
    //         return
    //     }
    // Items.find({res_name : req.body.res_name}, function (err, result) {
    //         if (result) {
    //             var results = [ ...restaurant, ...result]
    //             var i = 0;
    //             console.log(results[0].res_zipcode);
                
    //             console.log(result)
    //             res.status(200).json({
    //                             data: results,
    //                             message: 'Success'});

    //         }
    //          else{
    //             console.log("else");
    //             console.log(err);
    //             res.status(400).json({
    //                             data: err,
    //                             message: 'No items'});

            

    //             }
    //     });

    // });
    }

