var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var { Items } = require('.././models/res_items');
var { Restaurant } = require('.././models/res_signup');
var kafka = require('../kafka/client')

module.exports.detail = function (req, res) {

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

}

