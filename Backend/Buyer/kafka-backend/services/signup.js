var bcrypt = require('../bcrypt');
var { mongoose } = require('.././db/mongoose');
var {Buyer} = require('.././models/buyer_signup');

function handle_request(msg, callback){
    var hashpassword;
    var buyer = new Buyer({
        "fname": msg.fname,
        "lname": msg.lname,
        "email": msg.email,
        "password": msg.password,
        "phone": msg.phone

    });
    
    Buyer.findOne({email : msg.email}, function (err, result) {
        if (err) {
            console.log("if");
            callback(msg,"Error");
        }
        if (result == null) {
            console.log("in if")
            bcrypt.encrypt(buyer.password, function (res1) {
                hashpassword = res1;
                buyer.password = hashpassword;
            //     //var sql = "INSERT INTO buyer_signup (b_id,fname,lname,email,phone,pwd) VALUES (null,'" + buyer.fname + "','" + buyer.lname + "','" + buyer.email + "','"+buyer.phone+"','"+ buyer.pwd + "')";
            //     //console.log(sql);
                console.log("hello")
                buyer.save()
                .then((result,err) => {
                    if (err) {
                        console.log(err)
                        if (err.code === 'ER_DUP_ENTRY') {
                            callback(msg,[]);
                        
                        } else {
                            console.log(err)
                            callback(msg,[]);
                        }

                    }

                    else {
                        console.log( "result" + result);
                        callback(msg,result);
                       }
                });
            })
        }
        else {
            console.log(err)
            callback(msg,[]);
        }


    });

    
}
exports.handle_request = handle_request;
