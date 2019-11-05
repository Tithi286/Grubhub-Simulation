
var { mongoose } = require('.././db/mongoose');
var {Orders} = require('.././models/res_orders');

function handle_request(msg, callback){
        s_food = msg.s_food;
        s_order = msg.s_order;
        orderid= msg.orderid;
        res_email= msg.res_email;
        console.log(s_food)
        console.log(orderid)
           
        Orders.updateOne({res_email: res_email, _id: orderid}, { $set : {"s_food": s_food , "s_order":s_order}}) 
        .then((result, err)=>{
                if (err) {
                    console.log(err)
                    callback(msg,"Error");
                }
                else{
                    console.log(result);
                    callback(msg,result);
                
    
                }
            });
    }

    exports.handle_request = handle_request;