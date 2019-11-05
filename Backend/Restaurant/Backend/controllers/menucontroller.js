var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var {Items} = require('.././models/res_items');
var kafka = require('../kafka/client');

// module.exports.menu = function(req,res) {
//     var menusection=[];
//     var sql = "SELECT DISTINCT menu_sec FROM res_items";
//     console.log(sql);    
//     connection.query(sql, function (err, result) {
//             if (err) {
//                 console.log(err)
//                 res.status(400).json({
//                         data: err,
//                         message: 'No active orders'});
//             }
//              else{
//                     // res.writeHead(200, {
//                     //     'Content-Type': 'application/json'
//                     // });
//                     // console.log("items : ", JSON.stringify(result));
//                     // res.end(JSON.stringify(result));
//                     // console.log(result[0].menu_sec);
//                     // var i = 0;
//                     // result.forEach(function(item) {
//                     //     menusection.push(result[i].menu_sec);
//                     //     i++;
//                     // });

//                     console.log(result);
//                     res.status(200).json({
//                                     data: result,
//                                     message: 'Success'});

//                 }
//         });
//     }
module.exports.menu = function(req,res) {
    // var r_id = req.body.r_id;
    // var sql = "SELECT * FROM res_items WHERE r_id='"+r_id+"'";
    // console.log(sql);    
    // Items.find({res_email : req.body.res_email}, function (err, result) {
    //         if (err) {
    //             console.log(err)
    //             res.status(400).json({
    //                     data: err,
    //                     message: 'No active orders'});
    //         }
    //          else{
    //                 var section = {}
    //                 var i = 0;
    //                 console.log(result);
    //                 res.status(200).json({
    //                                 data: result,
    //                                 message: 'Success'});

    //             }
    //     });

    kafka.make_request('res_menu', req.body, function (err, result) { 
        if (err) {
            console.log(err)
            res.status(400).json({
                    data: err,
                    message: 'No active orders'});
        }
         else{
                var section = {}
                var i = 0;
                console.log(result);
                res.status(200).json({
                                data: result,
                                message: 'Success'});

            }
    });
    }