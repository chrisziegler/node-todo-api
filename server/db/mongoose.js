//mongoose configuration file
var mongoose = require('mongoose');

//use standard built-in ES6 Promises
mongoose.Promise = global.Promise;

//we repurpose MONGODB_URI for local environments in db/config
//with NODE_ENV = production set by heroku - config.js environments ignored in production
//MONGODB_URI set configured with mLabs addon to heroku
//check address on process.env or $ heroku config
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose }