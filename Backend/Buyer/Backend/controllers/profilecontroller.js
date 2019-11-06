var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var { Buyer } = require('.././models/buyer_signup');
var kafka = require('../kafka/client');

module.exports.profile = function (req, res) {
        kafka.make_request('buyer_profile', req.body, function (err, result) {
                console.log("inside profilecontroller query")
                if (err) {
                        console.log(err)
                        res.status(400).json({
                                data: err,
                                message: 'Error'
                        });
                }
                else {

                        console.log(result);
                        res.status(200).json({
                                data: result,
                                message: 'Success'
                        });

                }

        });
}