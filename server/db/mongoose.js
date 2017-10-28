//mongoose configuration file
var mongoose = require('mongoose');

//use standard built-in ES6 Promises
mongoose.Promise = global.Promise;
// path/ip still provided statically - and revealed in mongodb server command prompt
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };