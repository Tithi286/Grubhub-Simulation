
var { mongoose } = require('.././db/mongoose');
var {Buyer} = require('.././models/buyer_signup');

function handle_request(msg, callback){
   
    console.log("hi")
    Buyer.findOne({email : msg.email}, function (err, result) {
        console.log("inside profilecontroller query")
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