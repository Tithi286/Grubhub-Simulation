var { mongoose } = require('.././db/mongoose');
var {Restaurant} = require('.././models/res_signup');

function handle_request(msg, callback){
    var name = {
        phone: msg.phone,
        email: msg.email
    }
        
    Restaurant.updateOne({email: name.email}, { $set : {"phone": name.phone}}) 
    .then((result, err)=>{
        console.log("update phone")
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