var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var {Orders} = require('.././models/res_orders');
var kafka = require('../kafka/client')

module.exports.placeorder = function (req, res) {

    var orders = new Orders({
        "buyer_email": req.body.buyer_email,
        "buyer_add": req.body.buyer_add,
        "res_name": req.body.res_name,
        "r_id": req.body.r_id,
        "item_name": req.body.orders,
        "s_order": "active",
        "s_food": "new",
        "total" : req.body.total
        
       });

       kafka.make_request('buyer_placeorder', req.body, function (err, result) {
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

   
    
    // var sql = "INSERT INTO r_order (buyer_email, buyer_add) VALUES ('" + order.buyer_email + "', '" + order.buyer_add + "')";
    // console.log(sql);
    // orders.save()
    // .then((result,err) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(400).json({
    //             data: err,
    //             message: 'error'
    //         });
    //     }
    //     else {

            // console.log(result.insertId);
            // var id = result.insertId;
            // // order.orders.forEach(item => {
                
            //     var sql1 = "INSERT INTO res_orders (order_id, r_id, res_name, item_name, item_price) VALUES ('" + id + "', '" + order.r_id + "', '" + order.res_name + "', '" + item[0] + "', '" + item[2] + "')";
            //     console.log(sql1);
            //     connection.query(sql1, function (err, result) {
            //         if (err) {
            //             console.log(err)
            //             res.status(400).json({
            //                 data: err,
            //                 message: 'No active orders'
            //             });
            //         }
            //         else {

            //             console.log(result);
            //             res.json({
                        
            //                 data: result,
            //                 message: 'Success'
            //             });

            //         }
            //     });
            // });


                
                // var sql1 = "INSERT INTO res_orders (order_id, r_id, res_name, item_name) VALUES ('" + id + "', '" + order.r_id + "', '" + order.res_name + "', '" + order.orders + "')";
                // console.log(sql1);
            // Orders.find({buyer_email : email, s_order:"active"}, function (err, result) {
            //         if (err) {
            //             console.log(err)
            //             res.status(400).json({
            //                     data: err,
            //                     message: 'No active orders'});
            //             return
            //         }    
            //     orders.save()
            //     .then((result,err) => {
            //         if (err) {
            //             console.log(err)
            //             res.status(400).json({
            //                 data: err,
            //                 message: 'No active orders'
            //             });
            //         }
            //         else {

            //             console.log(result);
            //             res.json({
                        
            //                 data: result,
            //                 message: 'Success'
            //             });

            //         }
            //     });


    //     }
    // });

// })

}
