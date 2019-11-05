
var bcrypt = require('../bcrypt');
var { mongoose } = require('.././db/mongoose');
var {Buyer} = require('.././models/buyer_signup');

function handle_request(msg, callback){
    var buyerlogin = {
        "email": msg.email,
        "password": msg.password

    }

    Buyer.findOne({email : msg.email}, function (err, results) {
       
        if (err) {
            callback(msg,"Error");
        }

        else if(results != null){
            console.log(results)
            bcrypt.hashcompare(buyerlogin.password,results.password,function(err,isMatch){
                if(isMatch && !err){
                    console.log("connection established")
                    var info = {
                        fname : results.fname,
                        lname: results.lname,
                        email: results.email,
                        phone: results.phone,
                        cuisine: results.cuisine
                        
                    }
                    callback(msg,info);
                    console.log("info"+info)
                 }
                 else{
                    console.log(" data");
                    callback(msg,[]);
                     }
                })
            
        }
        else{
            console.log("no data");
            callback(msg,[]);
            }
        });
}

exports.handle_request = handle_request;