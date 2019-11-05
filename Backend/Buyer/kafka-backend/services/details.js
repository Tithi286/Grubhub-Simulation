
var { mongoose } = require('.././db/mongoose');
var {Items} = require('.././models/res_items');
var {Restaurant} = require('.././models/res_signup');

function handle_request(msg, callback){
     
    Restaurant.find({res_name : msg.res_name}, function (err, restaurant) {
        if (err) {
            console.log(err);
            callback(msg,"Error");
            return
        }
        Items.find({res_name : msg.res_name}, function (err, result) {
            if (result) {
                var results = [ ...restaurant, ...result]
                var i = 0;
                console.log(results[0].res_zipcode);
                console.log(result)
                callback(msg,results);
            }
             else{
                console.log("else");
                console.log(err);
                callback(msg,"Error");
                }
        });

        });
    }

    exports.handle_request = handle_request;