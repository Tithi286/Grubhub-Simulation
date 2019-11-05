var connection = require('../config');
var bcrypt = require('../bcrypt');
var { mongoose } = require('.././db/mongoose');
var {Buyer} = require('.././models/buyer_signup');
var kafka = require('../kafka/client');
module.exports.signup = function (req, res) {
    var hashpassword;
    var buyer = new Buyer({
        "fname": req.body.fname,
        "lname": req.body.lname,
        "email": req.body.email,
        "password": req.body.password,
        "phone": req.body.phone

    });
    
    // Buyer.findOne({email : req.body.email}, function (err, result) {
    //     if (err) {
    //         console.log("if");
    //         res.status(401).json({
    //             data: err,
    //             message: 'error.'
    //         });
    //     }
    //     if (result == null) {
    //         console.log("in if")
    //         bcrypt.encrypt(buyer.password, function (res1) {
    //             hashpassword = res1;
    //             buyer.password = hashpassword;
    //         //     //var sql = "INSERT INTO buyer_signup (b_id,fname,lname,email,phone,pwd) VALUES (null,'" + buyer.fname + "','" + buyer.lname + "','" + buyer.email + "','"+buyer.phone+"','"+ buyer.pwd + "')";
    //         //     //console.log(sql);
    //             console.log("hello")
    //             buyer.save()
    //             .then((result,err) => {
    //                 if (err) {
    //                     console.log(err)
    //                     if (err.code === 'ER_DUP_ENTRY') {
    //                         res.status(200).json({
    //                             status: 401,
    //                             data: "email already exists",
    //                             message: 'email already exists. please enter other email.'
    //                         });
    //                     } else {
    //                         console.log(err)
    //                         res.status(400).json({
    //                             data: err,
    //                             message: 'email already exists. please enter other email.'
    //                         });
    //                     }

    //                 }

    //                 else {
    //                     console.log(result);
    //                     res.status(200).json({ message: "Success", status: 200 })
    //                     // res.cookie('user_id', result[0].id, { httpOnly: false, path: '/' });
    //                     //                 res.cookie('is_owner', results[0].is_owner, { httpOnly: false, path: '/' });
    //                                     // res.json({
    //                                     //     status: 200,
    //                                     //     data: result,
    //                                     //     message: 'user fetched sucessfully'
    //                                     // })


    //                 }
    //             });
    //         })
    //     }
    //     else {
    //         console.log(err)
    //         res.json({
    //             status: 400,
    //             data: err,
    //             message: 'email already exists. please enter other email.'
    //         });
    //     }


    // });

    kafka.make_request('buyer_signup', buyer, function (err, buyers) {
        console.log('in result');
        if (err) {
            console.log("Inside err");
            res.status(403).json({
                success: false,
                message: "System Error, Try Again."
            })
        } else {
            if (Object.keys(buyers).length != 0) {
                console.log("else if")
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


}
