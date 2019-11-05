var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Items = mongoose.model('res_items',{
    res_name :{
        type : String,
        ref: 'Restaurant'
    },
    res_zipcode:{
        type : String
    },
    r_id:{
        type: ObjectId
    },
    item_id :{
        type : ObjectId,
    },
    phone:{
        type : Number
    },
    item_name:{
        type : String
    },
    item_desc:{
        type : String
    },
    item_price : {
        type : Number
    },
    menu_sec:{
        type : String
    },
});

module.exports = {Items};

