var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Orders = mongoose.model('res_orders',{

    order_id :{
        type : ObjectId
    },
    item_name :{
        type : Array
    },
    res_name:{
        type : String
    },
    s_order:{
        type : String
    },
    s_food:{
        type : String
    },
    buyer_email:{
        type : String
    },
    buyer_add:{
        type : String
    }
    
});

module.exports = {Orders};