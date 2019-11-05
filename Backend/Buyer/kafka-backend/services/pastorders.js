
var { mongoose } = require('.././db/mongoose');
var {Orders} = require('.././models/res_orders');

function handle_request(msg, callback){
      
    Orders.find({buyer_email : msg.email, s_order:"completed"}, function (err, result) {
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