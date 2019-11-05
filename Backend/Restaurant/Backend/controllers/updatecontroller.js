var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var {Restaurant} = require('.././models/res_signup');
var kafka = require('../kafka/client');
module.exports.updatename = function(req,res) {
    var name = {
        name : req.body.name,
        email: req.body.email
    }
    // var sql = "UPDATE res_signup SET name='"+name.name+"' WHERE email='"+name.email+"'";
    // console.log(sql);    
    // Restaurant.updateOne({email: name.email}, { $set : {"name": name.name}}) 
    // .then((result, err)=>{
    //         if (err) {
    //             console.log(err)
    //             if(err.code === 'ER_DUP_ENTRY'){
    //                 res.status(200).json({
    //                     status:401,
    //                     data: "email already exists",
    //                     message: 'email already exists. please enter other email.'});
    //             }else{
    //                 console.log(err)
    //                 res.status(400).json({
    //                     data: err,
    //                     message: 'email already exists. please enter other email.'});
    //             }
                
    //         }
    //         else{
    //             console.log(result);
    //             res.status(200).json({message:"Success",status:200})
            

    //         }
    //     });

    kafka.make_request('res_updatename', req.body, function (err, result) { 

        console.log("update name")
            if (err) {
                console.log(err)
                if(err.code === 'ER_DUP_ENTRY'){
                    res.status(200).json({
                        status:401,
                        data: "email already exists",
                        message: 'email already exists. please enter other email.'});
                }else{
                    console.log(err)
                    res.status(400).json({
                        data: err,
                        message: 'email already exists. please enter other email.'});
                }
                
            }
            else{
                console.log(result);
                res.status(200).json({message:"Success",status:200})
            

            }
        });

    }

    module.exports.updateemail = function(req,res) {
        var name = {
           email: req.body.email,
           email2: req.body.email2
           
        }
        // var sql = "UPDATE res_signup SET email='"+name.email+"' WHERE email='"+name.email2+"'";
        // console.log(sql);    
        kafka.make_request('res_updateemail', req.body, function (err, result) {
        
                if (err) {
                    console.log(err)
                    if(err.code === 'ER_DUP_ENTRY'){
                        res.status(200).json({
                            status:401,
                            data: "email already exists",
                            message: 'email already exists. please enter other email.'});
                    }else{
                        console.log(err)
                        res.status(400).json({
                            data: err,
                            message: 'email already exists. please enter other email.'});
                    }
                    
                }
                else{
                    console.log(result);
                    res.status(200).json({message:"Success",status:200})
                
    
                }
            });
        }

        module.exports.updatephone = function(req,res) {
            var name = {
               phone: req.body.phone,
               email: req.body.email
               
            }
            // var sql = "UPDATE res_signup SET phone='"+name.phone+"' WHERE email='"+name.email+"'";
            // console.log(sql);    
            kafka.make_request('res_updatephone', req.body, function (err, result) {
                    if (err) {
                        console.log(err)
                        if(err.code === 'ER_DUP_ENTRY'){
                            res.status(200).json({
                                status:401,
                                data: "email already exists",
                                message: 'email already exists. please enter other email.'});
                        }else{
                            console.log(err)
                            res.status(400).json({
                                data: err,
                                message: 'email already exists. please enter other email.'});
                        }
                        
                    }
                    else{
                        console.log(result);
                        res.status(200).json({message:"Success",status:200})
                    
        
                    }
                });
            }

            module.exports.updateresname = function(req,res) {
                var name = {
                   resname: req.body.resname,
                   email: req.body.email
                   
                }
                // var sql = "UPDATE res_signup SET res_name='"+name.resname+"' WHERE email='"+name.email+"'";
                // console.log(sql);    
                kafka.make_request('res_updateresname', req.body, function (err, result) {
                        if (err) {
                            console.log(err)
                            if(err.code === 'ER_DUP_ENTRY'){
                                res.status(200).json({
                                    status:401,
                                    data: "email already exists",
                                    message: 'email already exists. please enter other email.'});
                            }else{
                                console.log(err)
                                res.status(400).json({
                                    data: err,
                                    message: 'email already exists. please enter other email.'});
                            }
                            
                        }
                        else{
                            console.log(result);
                            res.status(200).json({message:"Success",status:200})
                        
            
                        }
                    });
                }
    