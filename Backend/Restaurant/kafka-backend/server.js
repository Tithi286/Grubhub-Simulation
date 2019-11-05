var connection =  new require('./kafka/Connection');
//topics files
var rsignup = require('./services/signup');
var rlogin = require('./services/login');
var rprofile = require('./services/profile');
var rupdatename = require('./services/updatename');
var rupdateemail = require('./services/updateemail');
var rupdatephone = require('./services/updatephone');
var rupdateresname = require('./services/updateresname');
var rhome = require('./services/home');
var rupdatefoodstatus = require('./services/updatefoodstatus');
var additem = require('./services/additem');
var updateitemname = require('./services/updateitemname');
var updateitemdesc = require('./services/updateitemdesc');
var updatemenusection = require('./services/updatemenusection');
var updateitemprice = require('./services/updateitemprice');
var deleteitem = require('./services/deleteitem');
var deletesection = require('./services/deletesection');
var rmenu = require('./services/menu');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("res_signup",rsignup)
handleTopicRequest("res_login",rlogin)
handleTopicRequest("res_profile",rprofile)
handleTopicRequest("res_updatename",rupdatename)
handleTopicRequest("res_updateemail",rupdateemail)
handleTopicRequest("res_updatephone",rupdatephone)
handleTopicRequest("res_updateresname",rupdateresname)
handleTopicRequest("res_home",rhome)
handleTopicRequest("res_updatefoodstatus",rupdatefoodstatus)
handleTopicRequest("res_additem",additem)
handleTopicRequest("res_updateitemname",updateitemname)
handleTopicRequest("res_updateitemdesc",updateitemdesc)
handleTopicRequest("res_updatemenusection",updatemenusection)
handleTopicRequest("res_updateitemprice",updateitemprice)
handleTopicRequest("res_deleteitem",deleteitem)
handleTopicRequest("res_deletesection",deletesection)
handleTopicRequest("res_menu",rmenu)