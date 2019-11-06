
var { mongoose } = require('.././db/mongoose');
var { Orders } = require('.././models/res_orders');

function handle_request(msg, callback) {
    order = msg.s_order;
    res_name = msg.res_name;
    console.log("orders")
    Orders.find({ res_name: msg.res_name, s_order: msg.s_order }, function (err, result) {
        if (err) {
            console.log("err")
            console.log(err)
            callback(msg, "Error");
        }
        else {
            console.log("result")
            console.log(result);
            callback(msg, result);
        }
    });
}

exports.handle_request = handle_request;