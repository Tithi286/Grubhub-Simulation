var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var { Items } = require('.././models/res_items');
var kafka = require('../kafka/client');

module.exports.additem = function (req, res) {
    var item = new Items({
        "r_id": new mongoose.Types.ObjectId,
        "res_name": req.body.res_name,
        "res_email": req.body.res_email,
        "item_name": req.body.itemname,
        "item_desc": req.body.itemdesc,
        "menu_sec": req.body.menusection,
        "item_price": req.body.itemprice,
        "cuisine": req.body.cuisine
    });
    console.log(item);
    console.log("hi")
    kafka.make_request('res_additem', req.body, function (err, result) {
        if (err) {
            console.log(err)
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(200).json({
                    status: 201,
                    data: "item already exists",
                    message: 'item already exists. please enter other item name.'
                });
            } else {
                console.log(err)
                res.status(400).json({
                    data: err,
                    message: 'something went wrong. please try again'
                });
            }

        }
        else {
            console.log(result);
            res.status(200).json({ message: "Success", status: 200 })


        }
    });
}
module.exports.updateitemname = function (req, res) {
    kafka.make_request('res_updateitemname', req.body, function (err, result) {
        if (result.affectedRows == 0) {
            console.log(err)
            res.status(201).json({
                data: "item already exists",
                message: 'item already exists. please enter other item name.'
            });
        }
        else {
            console.log(result);
            res.status(200).json({ message: "Success", status: 200 })


        }
    });
}
module.exports.updateitemdesc = function (req, res) {
    kafka.make_request('res_updateitemdesc', req.body, function (err, result) {
        if (result.affectedRows == 0) {
            console.log(err)
            res.status(201).json({
                data: "item already exists",
                message: 'item already exists. please enter other item name.'
            });
        }
        else {
            console.log(result);
            res.status(200).json({ message: "Success", status: 200 })


        }
    });
}

module.exports.updatemenusection = function (req, res) {
    kafka.make_request('res_updatemenusection', req.body, function (err, result) {
        if (result.affectedRows == 0) {
            console.log(err)
            res.status(201).json({
                data: "item already exists",
                message: 'item already exists. please enter other item name.'
            });
        }
        else {
            console.log(result);
            res.status(200).json({ message: "Success", status: 200 })


        }
    });
}

module.exports.updateitemprice = function (req, res) {
    kafka.make_request('res_updateitemprice', req.body, function (err, result) {
        if (result.affectedRows == 0) {
            console.log(err)
            res.status(201).json({
                data: "item already exists",
                message: 'item already exists. please enter other item name.'
            });
        }
        else {
            console.log(result);
            res.status(200).json({ message: "Success", status: 200 })


        }
    });
}

module.exports.deleteitem = function (req, res) {
    kafka.make_request('res_deleteitem', req.body, function (err, result) {

        if (result.affectedRows == 0) {
            console.log(err)
            res.status(201).json({
                data: "item already exists",
                message: 'item already exists. please enter other item name.'
            });
        }
        else {
            console.log(result);
            res.status(200).json({ message: "Success", status: 200 })


        }
    });
}

module.exports.deletesection = function (req, res) {
    kafka.make_request('res_deletesection', req.body, function (err, result) {
        if (result.affectedRows == 0) {
            console.log(err)
            res.status(201).json({
                data: "item already exists",
                message: 'item already exists. please enter other item name.'
            });
        }
        else {
            console.log(result);
            res.status(200).json({ message: "Success", status: 200 })


        }
    });
}