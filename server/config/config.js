
//Heroku sets this value process.env.NODE_ENV === 'production'; by default.
var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    //requiring JSON automagically parses it into JS object
    var config = require('./config.json');
    var envConfig = config[env];
    //loop over array ['PORT' 'MONGODB_URI'] setting values 
    //from config.json for the env (dev or test) set in envConfig
   Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
   });
}

//Old config JS for comparisson (nothing sensitive)
// if (env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// } 

