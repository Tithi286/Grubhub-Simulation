var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var {Restaurant} = require('.././models/res_signup');
var kafka = require('../kafka/client');

module.exports.profile = function(req,res) {
   email= req.body.email
//     var sql = "SELECT * FROM res_signup WHERE email='"+email+"'";
//     console.log(sql);    
    kafka.make_request('res_profile', req.body, function (err, result) {
            if (err) {
                console.log(err)
                res.status(400).json({
                        data: err,
                        message: 'No active orders'});
            }
             else{
                   
                    console.log(result);
                    res.status(200).json({
                                    data: result,
                                    message: 'Success'});

                }
        });
    }