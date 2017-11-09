const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique: true,
        validate: {
            //same as validator: (value) => {     return validator.isEmail(value); },
            validator: validator.isEmail,
            //mongoose syntax for {INJECT}
            message: '{VALUE} is not a valid email'
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

UserSchema.methods.toJSON = function () {
    //just a way to make it easier to reason about "this"
    let user = this;
    //converts our mongoose object (this) into a regualr JS object
    //where only the properties available on the document exist
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    //the user Object called  in POST /users route
    let user = this;
    let access = 'auth';
    // will eventually take this secret out of the code and assign it a configuration
    // variable
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    //update the local model
    user.tokens.push({access, token})
    // save it, return it to allow server.js to chain on this promise with a then
    // statement on the token it returns
    return user.save().then(() => {
            return token;
        })
};
//statics kind of like methods only creates a model method
//instead of an instance. Instance methods get called with the indivudual
//user document. Model methods get called with the Model User "this" binding
UserSchema.statics.findByToken = function(token) {
    let User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        //to query a nested document w/dot notation we need quotes on the key
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

UserSchema.statics.findByCredentials = function(email, password) {
    let User = this;

    //a mongoodse method - set an email property equal to email variable
    //we will be chaining this in server.js - so need to return promise
    //but there's still work to be done (then) verifying the psswd matches
    return User.findOne({email}).then((user) => {
        //if we don't find a user we want to do something different
        if (!user) {
            //return rejected promise to trigger catch case in server.js
            return Promise.reject();
        }
        //unfortunately all of bcrypts methods including
        //bcrypt.compare() only support callbacks and do not support promises
        //but we can WRAP any type of function INSIDE a promise
        return new Promise((resolve, reject) => {
            //res is either true or false, true if they match
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        }) 
    })
};

//will run some code before a given event (save) to the db
UserSchema.pre('save', function (next) {
    let user = this;

    //we only want to encrypt password if it was just modified
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

// var newUser = new User({email: 'chrisrziegler@gmail.com'}); //Save to db, use
// then on our Promise, print out document in success case
// newUser.save().then((doc) => {         console.log(JSON.stringify(doc,
// undefined, 2));     }, (e) => {         console.log('Unable to save', e);
// });

module.exports = {
    User
};