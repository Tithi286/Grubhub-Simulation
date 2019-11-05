
var { mongoose } = require('.././db/mongoose');
var {Orders} = require('.././models/res_orders');

function handle_request(msg, callback){
    order = msg.s_order;
    res_name= msg.res_name;
    //var sql = "SELECT * FROM res_orders I JOIN r_order S on I.order_id = S.id WHERE I.r_id='"+r_id+"'AND I.s_order='"+order+"'";
    //console.log(sql);    
    console.log("orders")
    Orders.find({res_name : msg.res_name, s_order: msg.s_order}, function (err, result) {
            if (err) {
                console.log("err")
                console.log(err)
                callback(msg,"Error");
            }
            else{
                console.log("result")
                console.log(result);
                callback(msg,result);
            }
        });
    }

    exports.handle_request = handle_request;