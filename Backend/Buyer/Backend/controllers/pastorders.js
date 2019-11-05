var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var {Orders} = require('.././models/res_orders');
var kafka = require('../kafka/client')

module.exports.pastorders = function(req,res) {
   
    kafka.make_request('buyer_pastorders', req.body, function (err, result) {
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