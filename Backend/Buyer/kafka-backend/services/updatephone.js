var { mongoose } = require('.././db/mongoose');
var {Buyer} = require('.././models/buyer_signup');

function handle_request(msg, callback){
    var name = {
        phone: msg.phone,
        email: msg.email
    }
    
    Buyer.updateOne({email: name.email}, { $set : {"phone": name.phone}}) 
    .then((result, err)=>{
        console.log("update email")
            if (err) {
                console.log(err)
                if(err.code === 'ER_DUP_ENTRY'){
                    callback(msg,"Error");
                }
                else{
                    console.log(err)
                    callback(msg,"Error");
                    
                }
                
            }
            else{
                console.log(result);
                callback(msg,result);
                
            }
        });
    }

    exports.handle_request = handle_request;