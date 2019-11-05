var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var { Items } = require('.././models/res_items');
var { Restaurant } = require('.././models/res_signup');

var kafka = require('../kafka/client')

module.exports.home = function (req, res) {
    // var fooditem = req.body.food;
    // console.log(fooditem)
    // var sql = "SELECT * FROM res_items WHERE item_name='"+fooditem+"'";
    // console.log(sql);  
    // console.log(req.body.food)
    // Items.find({ item_name: req.body.food }, function (err, result) {
    //     console.log("search")
    //     if (result) {
    //         console.log(result)
    //         res.status(200).json({
    //             statusCode: 200,
    //             data: result,
    //             message: 'Success'
    //         });
    //     }
    //     else {
    //         console.log("else");
    //         console.log(err);
    //         res.status(400).json({
    //             statusCODE: 400,
    //             data: err,
    //             message: 'No items'
    //         });

    //     }
    // });

    kafka.make_request('buyer_home', req.body, function (err, result) {
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
}

module.exports.filter = function (req, res) {
    console.log(req.body.food)
    console.log(req.body.cuisine)
    Items.find({ item_name: req.body.food, cuisine: req.body.cuisine}, function (err, result) {
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
}