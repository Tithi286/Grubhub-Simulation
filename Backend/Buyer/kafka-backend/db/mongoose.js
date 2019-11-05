var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin:admin@cluster0-kxq6d.mongodb.net/test?retryWrites=true&w=majority', {poolSize: 20},
{useNewUrlParser: true},
{userMongoClient : true},
{userUnifiedTopology: true});

module.exports = {mongoose};