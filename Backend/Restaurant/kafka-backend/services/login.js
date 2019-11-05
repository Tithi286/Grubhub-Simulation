var bcrypt = require('../bcrypt');
var { mongoose } = require('.././db/mongoose');
var {Restaurant} = require('.././models/res_signup');


function handle_request(msg, callback){
            var reslogin = {
                "email": msg.email,
                "password": msg.password
        
            }
        
            Restaurant.findOne({email : msg.email}, function (err, results) {
                if (err) {
                    callback(msg,"Error");
                }
                else if(results != null){
                    bcrypt.hashcompare(reslogin.password,results.password,function(err,isMatch){
                        if(isMatch && !err){
                            console.log("connection established");
                            var info = {
                                name : results.name,
                                email: results.email,
                                phone: results.phone,
                                resname: results.res_name,
                                zipcode: results.res_zipcode,
                               
                            }
                            callback(msg,info);
                            console.log(info)
                         }
                         else{
                            console.log("no data");
                            callback(msg,"Error");
                           
                             
                         }
                        
                    })
                    
                }
                else{
                    console.log("no data");
                    callback(msg,"Error");
                     
                 }
                
                });
}
exports.handle_request = handle_request;