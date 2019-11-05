var { mongoose } = require('.././db/mongoose');
var {Items} = require('.././models/res_items');

function handle_request(msg, callback){
       
    Items.updateOne({"res_email": msg.res_email, "item_name": msg.itemname}, { $set : {"item_price": msg.price}}) 
                    .then((result, err)=>{
            if (err) {
                console.log(err)
                if(err.code === 'ER_DUP_ENTRY'){
                    callback(msg,"Error");
        
                }else{
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