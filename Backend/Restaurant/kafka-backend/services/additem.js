var { mongoose } = require('.././db/mongoose');
var {Items} = require('.././models/res_items');
function handle_request(msg, callback){
    var item = new Items({
        "r_id" : new mongoose.Types.ObjectId,
        "res_name" :msg.res_name,
        "res_email": msg.res_email,
        "item_name": msg.itemname,
        "item_desc": msg.itemdesc,
        "menu_sec": msg.menusection,
        "item_price": msg.itemprice,
        "cuisine": msg.cuisine
    });
    // var sql = "INSERT INTO res_items (r_id,res_name,item_name,item_desc,item_price,menu_sec) VALUES ('"+item.r_id+"','"+item.res_name+"','"+item.name+"','"+item.desc+"','"+item.price+"','"+item.menusec+"')";
    console.log(item); 
    console.log("hi")   
    item.save()
    .then((result,err) => {
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