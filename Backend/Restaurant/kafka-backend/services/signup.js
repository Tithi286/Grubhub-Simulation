var bcrypt = require('../bcrypt');
var { mongoose } = require('.././db/mongoose');
var { Restaurant } = require('.././models/res_signup');

function handle_request(msg, callback) {
    var hashpassword;
    var restaurant = new Restaurant({
        "name": msg.name,
        "email": msg.email,
        "res_name": msg.resname,
        "res_zipcode": msg.zipcode,
        "password": msg.password,
        "phone": msg.phone,
        "cuisine": msg.cuisine
    });
    Restaurant.findOne({ email: msg.email }, function (err, result) {
        if (err) {
            callback(msg, "Error");
        }
        if (result == null) {
            bcrypt.encrypt(restaurant.password, function (res1) {
                hashpassword = res1;
                restaurant.password = hashpassword;
                restaurant.save()
                    .then((result, err) => {
                        if (err) {
                            console.log(err)
                            if (err.code === 'ER_DUP_ENTRY') {
                                callback(msg, []);
                            } else {
                                console.log(err)
                                callback(msg, []);
                            }
                        }
                        else {
                            console.log("result" + result);
                            callback(msg, result);


                        }
                    });
            })
        }
        else {
            console.log(err)
            callback(msg, []);
        }


    });
}
exports.handle_request = handle_request;