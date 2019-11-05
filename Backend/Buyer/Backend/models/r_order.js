var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Buyerdetails = mongoose.model('r_order',{
    id :{
        type : ObjectId,
    },
    buyer_email:{
        type : String
    },
    buyer_add:{
        type : String
    }
});

module.exports = {Buyerdetails};

