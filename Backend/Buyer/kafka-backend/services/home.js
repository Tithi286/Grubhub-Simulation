var { mongoose } = require('.././db/mongoose');
var { Items } = require('.././models/res_items');

function handle_request(msg, callback){

    Items.find({ item_name: msg.food }, function (err, result) {
        console.log("search")
        if (err) {
            console.log(err)
            callback(msg,"Error");
        }
        else {
            console.log("else");
            callback(msg,result);

        }
    });
}

exports.handle_request = handle_request;