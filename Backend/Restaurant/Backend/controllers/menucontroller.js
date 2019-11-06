var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var { Items } = require('.././models/res_items');
var kafka = require('../kafka/client');

module.exports.menu = function (req, res) {
    kafka.make_request('res_menu', req.body, function (err, result) {
        if (err) {
            console.log(err)
            res.status(400).json({
                data: err,
                message: 'No active orders'
            });
        }
        else {
            var section = {}
            var i = 0;
            console.log(result);
            res.status(200).json({
                data: result,
                message: 'Success'
            });

        }
    });
}