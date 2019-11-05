var { mongoose } = require('.././db/mongoose');
var {Items} = require('.././models/res_items');

function handle_request(msg, callback){
       
    Items.remove({"res_email": msg.res_email, "menu_sec": msg.menusection}) 
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