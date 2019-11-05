var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var {Items} = require('.././models/res_items');
var kafka = require('../kafka/client');

module.exports.additem = function(req,res) {
    var item = new Items({
        "r_id" : new mongoose.Types.ObjectId,
        "res_name" :req.body.res_name,
        "res_email": req.body.res_email,
        "item_name": req.body.itemname,
        "item_desc": req.body.itemdesc,
        "menu_sec": req.body.menusection,
        "item_price": req.body.itemprice,
        "cuisine": req.body.cuisine
    });
    // var sql = "INSERT INTO res_items (r_id,res_name,item_name,item_desc,item_price,menu_sec) VALUES ('"+item.r_id+"','"+item.res_name+"','"+item.name+"','"+item.desc+"','"+item.price+"','"+item.menusec+"')";
    console.log(item); 
    console.log("hi")   
    kafka.make_request('res_additem', req.body, function (err, result) { 
            if (err) {
                console.log(err)
                if(err.code === 'ER_DUP_ENTRY'){
                    res.status(200).json({
                        status:201,
                        data: "item already exists",
                        message: 'item already exists. please enter other item name.'});
                }else{
                    console.log(err)
                    res.status(400).json({
                        data: err,
                        message: 'something went wrong. please try again'});
                }
                
            }
            else{
                console.log(result);
                res.status(200).json({message:"Success",status:200})
            

            }
        });
    }
    module.exports.updateitemname = function(req,res) {
        // var item = {
        //     r_id: req.body.r_id,
        //     name: req.body.itemname,
        //     newname: req.body.itemname2,
        // }
        // var sql = "UPDATE res_items SET item_name='"+item.newname+"' WHERE r_id='"+item.r_id+"' AND item_name='"+item.name+"'";
        // console.log(sql);    
        kafka.make_request('res_updateitemname', req.body, function (err, result) { 
                if (result.affectedRows == 0) {
                    console.log(err)
                        res.status(201).json({
                            data: "item already exists",
                            message: 'item already exists. please enter other item name.'});
                    }
                else{
                    console.log(result);
                    res.status(200).json({message:"Success",status:200})
                
    
                }
            });
        }
        module.exports.updateitemdesc = function(req,res) {
            // var item = {
            //     r_id: req.body.r_id,
            //     name: req.body.itemname,
            //     newdesc: req.body.itemdesc,
            // }
            // var sql = "UPDATE res_items SET item_desc='"+item.newdesc+"' WHERE r_id='"+item.r_id+"' AND item_name='"+item.name+"'";
            // console.log(sql);    
            // Items.updateOne({"res_email": req.body.res_email, "item_name": req.body.itemname}, { $set : {"item_desc": req.body.itemdesc}}) 
            // .then((result, err)=>{
            //         if (result.affectedRows == 0) {
            //             console.log(err)
            //                 res.status(201).json({
            //                     data: "item already exists",
            //                     message: 'item already exists. please enter other item name.'});
            //             }
            //         else{
            //             console.log(result);
            //             res.status(200).json({message:"Success",status:200})
                    
        
            //         }
            //     });

            kafka.make_request('res_updateitemdesc', req.body, function (err, result) {
                    if (result.affectedRows == 0) {
                        console.log(err)
                            res.status(201).json({
                                data: "item already exists",
                                message: 'item already exists. please enter other item name.'});
                        }
                    else{
                        console.log(result);
                        res.status(200).json({message:"Success",status:200})
                    
        
                    }
                });
            }

        module.exports.updatemenusection = function(req,res) {
                // var item = {
                //     r_id: req.body.r_id,
                //     name: req.body.itemname,
                //     menusec: req.body.menusection,
                // }
                // var sql = "UPDATE res_items SET menu_sec='"+item.menusec+"' WHERE r_id='"+item.r_id+"' AND item_name='"+item.name+"'";
                // console.log(sql);    
                    // Items.updateOne({"res_email": req.body.res_email, "item_name": req.body.itemname}, { $set : {"menu_sec": req.body.menusection}}) 
                    // .then((result, err)=>{
                    //     if (result.affectedRows == 0) {
                    //         console.log(err)
                    //             res.status(201).json({
                    //                 data: "item already exists",
                    //                 message: 'item already exists. please enter other item name.'});
                    //         }
                    //     else{
                    //         console.log(result);
                    //         res.status(200).json({message:"Success",status:200})
                        
            
                    //     }
                    // });

                kafka.make_request('res_updatemenusection', req.body, function (err, result) {
                        if (result.affectedRows == 0) {
                            console.log(err)
                                res.status(201).json({
                                    data: "item already exists",
                                    message: 'item already exists. please enter other item name.'});
                            }
                        else{
                            console.log(result);
                            res.status(200).json({message:"Success",status:200})
                        
            
                        }
                    });
                }

    module.exports.updateitemprice = function(req,res) {
                    // var item = {
                    //     r_id: req.body.r_id,
                    //     name: req.body.itemname,
                    //     price: req.body.price,
                    // }
                    // var sql = "UPDATE res_items SET item_price='"+item.price+"' WHERE r_id='"+item.r_id+"' AND item_name='"+item.name+"'";
                    // console.log(sql);    
                    // Items.updateOne({"res_email": req.body.res_email, "item_name": req.body.itemname}, { $set : {"item_price": req.body.price}}) 
                    // .then((result, err)=>{
                    //         if (result.affectedRows == 0) {
                    //             console.log(err)
                    //                 res.status(201).json({
                    //                     data: "item already exists",
                    //                     message: 'item already exists. please enter other item name.'});
                    //             }
                    //         else{
                    //             console.log(result);
                    //             res.status(200).json({message:"Success",status:200})
                            
                
                    //         }
                    //     });

                    kafka.make_request('res_updateitemprice', req.body, function (err, result) {
                            if (result.affectedRows == 0) {
                                console.log(err)
                                    res.status(201).json({
                                        data: "item already exists",
                                        message: 'item already exists. please enter other item name.'});
                                }
                            else{
                                console.log(result);
                                res.status(200).json({message:"Success",status:200})
                            
                
                            }
                        });
                    }

    module.exports.deleteitem = function(req,res) {
        // var item = {
        //     r_id: req.body.r_id,
        //     name: req.body.itemname,
        // }
        // var sql = "DELETE FROM res_items WHERE r_id='"+item.r_id+"' AND item_name='"+item.name+"'";
        // console.log(sql);    
        // Items.remove({"res_email": req.body.res_email, "item_name": req.body.itemname}) 
        // .then((result, err)=>{
        //         if (result.affectedRows == 0) {
        //             console.log(err)
        //                 res.status(201).json({
        //                     data: "item already exists",
        //                     message: 'item already exists. please enter other item name.'});
        //             }
        //         else{
        //             console.log(result);
        //             res.status(200).json({message:"Success",status:200})
                
    
        //         }
        //     });

        kafka.make_request('res_deleteitem', req.body, function (err, result) {
           
                if (result.affectedRows == 0) {
                    console.log(err)
                        res.status(201).json({
                            data: "item already exists",
                            message: 'item already exists. please enter other item name.'});
                    }
                else{
                    console.log(result);
                    res.status(200).json({message:"Success",status:200})
                
    
                }
            });
        }

        module.exports.deletesection = function(req,res) {
            // var item = {
            //     r_id: req.body.r_id,
            //     menusec: req.body.menusection,
            // }
            // var sql = "DELETE FROM res_items WHERE r_id='"+item.r_id+"' AND menu_sec='"+item.menusec+"'";
            // console.log(sql);    
            // Items.remove({"res_email": req.body.res_email, "menu_sec": req.body.menusection}) 
            // .then((result, err)=>{
            //         if (result.affectedRows == 0) {
            //             console.log(err)
            //                 res.status(201).json({
            //                     data: "item already exists",
            //                     message: 'item already exists. please enter other item name.'});
            //             }
            //         else{
            //             console.log(result);
            //             res.status(200).json({message:"Success",status:200})
                    
        
            //         }
            //     });

            
            kafka.make_request('res_deletesection', req.body, function (err, result) {
                    if (result.affectedRows == 0) {
                        console.log(err)
                            res.status(201).json({
                                data: "item already exists",
                                message: 'item already exists. please enter other item name.'});
                        }
                    else{
                        console.log(result);
                        res.status(200).json({message:"Success",status:200})
                    
        
                    }
                });
            }