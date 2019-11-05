var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var {Orders} = require('.././models/res_orders');
var kafka = require('../kafka/client')

module.exports.upcomingorders = function(req,res) {

    kafka.make_request('buyer_upcomingorders', req.body, function (err, result) {
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


    // var sql = "SELECT I.res_name,I.order_id, I.s_order,I.s_food, I.item_name, I.item_price, I.item_quantity, S.id, S.buyer_email FROM res_orders I JOIN r_order S on I.order_id=S.id WHERE S.buyer_email='"+email+"' AND I.s_order='active'";
    // console.log(sql);    
    // Orders.find({buyer_email : email, s_order:"active"}, function (err, result) {
    //         if (err) {
    //             console.log(err)
    //             res.status(400).json({
    //                     data: err,
    //                     message: 'No active orders'});
    //         }
    //          else{
    //             console.log("else");
    //                 console.log(result);
    //                 res.status(200).json({
    //                                 data: result,
    //                                 message: 'Success'});

    //             }
    //     });
    }