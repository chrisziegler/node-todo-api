//mongoose configuration file
var mongoose = require('mongoose');

//use standard built-in ES6 Promises
mongoose.Promise = global.Promise;
// path/ip uses MONGODB_URI if provided in process.env - will shutdown local mongodb server on init
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };