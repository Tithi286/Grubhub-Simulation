var connection = require('../config');
var bcrypt = require('../bcrypt');
var express = require('express');
var app = express();
var config = require('../config/settings');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var { mongoose } = require('.././db/mongoose');
var {Buyer} = require('.././models/buyer_signup');
var passportauth = passport.authenticate('jwt', { session: false });
app.use(passport.initialize());
require('../config/passport')(passport);

var kafka = require('../kafka/client');

module.exports.login = function (req, res) {
    var buyerlogin = {
        "email": req.body.email,
        "password": req.body.password

    }

    kafka.make_request('buyer_login', req.body, function (err, results) {
       
        if (err) {
                res.status(401).json({
                    data: err,
                    message: 'error.'
                });
        }
        else if(results != null){
                    console.log("loginresults"+results)
                    console.log("connection established");
                    
                    var token = jwt.sign(buyerlogin, config.secret, {
                        expiresIn: 60*60*1000 
                    });
                    console.log(token)
                    req.session.user = buyerlogin.email;
                    console.log(req.session.user);

                    res.json({
                        status: 200,
                        data: results,
                        token: 'JWT ' + token,
                        message: 'user fetched sucessfully',
                    })
                    console.log(results)
                
                
           
            
        }
        else{
            console.log("no data");
            res.status(200).json({
                status: 201,
                data: "Email does not match",
                message: 'Email does not match.'
            });
             
         }
         
        });
// }


}  
    
   
//     Buyer.findOne({email : req.body.email}, function (err, results) {
       
//         if (err) {
//                 res.status(401).json({
//                     data: err,
//                     message: 'error.'
//                 });
//         }
//         else if(results != null){
//             console.log(results)
//             console.log(buyerlogin.password)
//             console.log(results.password)
//             bcrypt.hashcompare(buyerlogin.password,results.password,function(err,isMatch){
//                 if(isMatch && !err){
//                     console.log("connection established");
//                     var token = jwt.sign(buyerlogin, config.secret, {
//                         expiresIn: 60*60*1000 
//                     });
//                     console.log(token)
//                     //res.cookie('cookie', buyerlogin.email, { maxAge: 900000, httpOnly: false, path: '/' });
//                     req.session.user = buyerlogin.email;
//                     //res.status(200).json({ message: "Success", status: 200 })
//                     var info = {
//                         fname : results.fname,
//                         lname: results.lname,
//                         email: results.email,
//                         phone: results.phone,
                        
//                     }
//                     res.json({
//                         status: 200,
//                         data: info,
//                         token: 'JWT ' + token,
//                         message: 'user fetched sucessfully',
//                     })
//                     console.log(info)
//                  }
//                  else{
//                     console.log(" data");
//                     res.status(200).json({
//                         status: 201,
//                         data: "password does not match",
//                         message: 'password does not match.'
//                     });
                     
//                  }
                
//             })
            
//         }
//         else{
//             console.log("no data");
//             res.status(200).json({
//                 status: 201,
//                 data: "Email does not match",
//                 message: 'Email does not match.'
//             });
             
//          }
         
//         });
// }

// module.exports.login = function(req,res){
//     var email = req.body.emailid;
//     var password = req.body.password;

//     v
//     connection.query(sql,function(error,result){
//         if(error){
//             console.log(error)
//             res.status(403).json({
//                 error:"Some error occured!"
//             });
//         }
//         else{
//             console.log(result)
//             if(result.length>0){
//                 if(result[0].pwd==password){
//                     res.cookie('b_id', results[0].id , { httpOnly: false, path: '/' });
//                     res.status(200).json({
//                         message:"Successfully logged in"});
//                 }
//                 else{
//                     console.log("inavid pwd")
//                     res.status(403).json({
//                     message:"invalid password"});
//                 }

//             }
//             else{
//                 console.log("pwd dont match");
//                 res.status(403).json({
//                     message:"login failed. Password didnt match."
//                 })
//             }
//         }

//     })
// }