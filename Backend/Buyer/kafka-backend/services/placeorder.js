var { mongoose } = require('.././db/mongoose');
var {Orders} = require('.././models/res_orders');

function handle_request(msg, callback){

    var orders = new Orders({
        "buyer_email": msg.buyer_email,
        "buyer_add": msg.buyer_add,
        "res_name": msg.res_name,
        "r_id": msg.r_id,
        "item_name": msg.orders,
        "s_order": "active",
        "s_food": "new",
        "total" : msg.total
        
       });

    Orders.find({buyer_email : msg.buyer_email, s_order:"active"}, function (err, result) {
                    if (err) {
                        console.log(err)
                        callback(msg,"Error");
                        return
                    }    
                orders.save()
                .then((result,err) => {
                    if (err) {
                        console.log(err)
                        callback(msg,"Error");

                    }
                    else {

                        console.log(result);
                        callback(msg,result);
                    
                    }
                });

})

}
exports.handle_request = handle_request;