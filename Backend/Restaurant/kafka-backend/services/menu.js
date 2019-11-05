var { mongoose } = require('.././db/mongoose');
var {Items} = require('.././models/res_items');

function handle_request(msg, callback){
       
    Items.find({res_email : msg.res_email}, function (err, result) {
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