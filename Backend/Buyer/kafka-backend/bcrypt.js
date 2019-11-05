const bcrypt = require('bcrypt');
 var hashpass = {};
 hashpass.encrypt = function(data,successCallback, failureCallback){
    bcrypt.hash(data, 10, function(err, hash) {
            if(err){
                //failureCallback(err);
                return ;
            }
            successCallback(hash);
      });
 }

 hashpass.hashcompare = function (data, encrypted, successCallback, failureCallback) {
    bcrypt.compare(data, encrypted, function (err, isMatch) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback(err, isMatch);
    });
};
module.exports = hashpass;

