var { mongoose } = require('.././db/mongoose');
var {Buyer} = require('.././models/buyer_signup');

function handle_request(msg, callback){
    var name = {
        email: msg.email,
        email2: msg.email2
    }
    // var sql = "UPDATE buyer_signup SET fname='"+name.firstname+"', lname='"+name.lastname+"' WHERE email='"+name.email+"'";
    // console.log(sql);    
    Buyer.updateOne({email: name.email2}, { $set : {"email": name.email}}) 
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