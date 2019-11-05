var connection =  new require('./kafka/Connection');
//topics files
var signup = require('./services/signup.js');
var login  = require('./services/login');
var profile = require('./services/profile');
var updatename = require('./services/updatename');
var updateemail = require('./services/updateemail');
var updatephone = require('./services/updatephone');
var home = require('./services/home');
var details = require('./services/details');
var placeorder = require('./services/placeorder');
var upcomingorders = require('./services/upcomingorders')
var pastorders = require('./services/pastorders')

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
handleTopicRequest("buyer_signup",signup)
handleTopicRequest("buyer_login",login)
handleTopicRequest("buyer_profile",profile)
handleTopicRequest("buyer_updatename",updatename)
handleTopicRequest("buyer_updateemail",updateemail)
handleTopicRequest("buyer_updatephone",updatephone)
handleTopicRequest("buyer_home",home)
handleTopicRequest("buyer_details",details)
handleTopicRequest("buyer_placeorder",placeorder)
handleTopicRequest("buyer_upcomingorders",upcomingorders)
handleTopicRequest("buyer_pastorders",pastorders)


