var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Restaurant = mongoose.model('res_signup',{
    r_id :{
        type : ObjectId
    },
    name :{
        type : String
    },
    email : {
        type : String
    },
    res_name:{
        type : String
    },
    res_zipcode:{
        type : String
    },
    cuisine:{
        type : String
    },
    phone:{
        type : String
    },
    password : {
        type : String 
    }
});

module.exports = {Restaurant};