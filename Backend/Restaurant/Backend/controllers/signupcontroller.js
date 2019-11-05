var connection = require('../config');
var bcrypt = require('../bcrypt');
var { mongoose } = require('.././db/mongoose');
var {Restaurant} = require('.././models/res_signup');
var kafka = require('../kafka/client');

module.exports.signup = function(req,res){
    var hashpassword;
    var restaurant = new Restaurant({
        "name" : req.body.name,
        "email" : req.body.email,
        "res_name": req.body.resname,
        "res_zipcode": req.body.zipcode,
        "password" : req.body.password,
        "phone": req.body.phone,
        "cuisine": req.body.cuisine
    });
 console.log(restaurant)
    kafka.make_request('res_signup', req.body, function (err, result) {
        console.log('in result');
        if (err) {
            console.log("Inside err");
            res.status(403).json({
                success: false,
                message: "System Error, Try Again."
            })
        } else {
            if (Object.keys(result).length != 0) {
                console.log("else if")
                console.log(result)
                res.status(200).json({
                    success: true,
                    message: "Success",
                });
            } else {
                console.log("else else")
                res.status(201).json({
                    success: false,
                    message: 'Buyer already exists'
                })
            }
            res.end();
        }

    });

    // var mysql = "SELECT * FROM res_signup WHERE email = '" + resuser.email + "'";
//     Restaurant.findOne({email : req.body.email}, function (err, result) {
//         if (err) {
//             res.status(403).json({ error: 'Some error with query!' });
//         }
//         if (result == null) {
//             bcrypt.encrypt(restaurant.password, function (res1) {
//                 hashpassword = res1;
//                 restaurant.password = hashpassword;
//     // var sql = "INSERT INTO res_signup (phone,name,email,res_name,res_zipcode,pwd) VALUES ("+resuser.phone+",'"+resuser.name+"','"+resuser.email+"','"+resuser.res_name+"','"+resuser.res_zipcode+"','"+resuser.pwd+"')";
//     // console.log(sql);    
//             restaurant.save()
//             .then((result,err) => {
//             if (err) {
//                 console.log(err)
//                 if(err.code === 'ER_DUP_ENTRY'){
//                     res.status(200).json({
//                         status:401,
//                         data: "email already exists",
//                         message: 'email already exists. please enter other email.'});
//                 }else{
//                     console.log(err)
//                     res.status(403).json({
//                         data: err,
//                         message: 'email already exists. please enter other email.'});
//                 }
//                 }
//             else{
//                 console.log(result);
//                 res.status(200).json({message:"Success",status:200})

                            

//             }
//         });
//     })
// }
//         else{
//             console.log(err)
//             res.json({
//                 status:400,
//                 data: err,
//                 message: 'email already exists. please enter other email.'});
//         }


// });
}
