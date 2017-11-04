const mongoose = require('mongoose');
const validator = require('validator');



var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        //checks to make sure the property email does not have the same value as any
        //other documents in the collection - e.g. the user has already signed-up
        unique: true,
        validate: {
            //same as
            // validator: (value) => {
            //     return validator.isEmail(value);
            // },
            validator: validator.isEmail,
            //mongoose syntax for {INJECT}
            message: '{VALUE} is not a valid email'
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
    }
});


// var newUser = new User({email: 'chrisrziegler@gmail.com'});

// //Save to db, use then on our Promise, print out document in success case
// newUser.save().then((doc) => {
//         console.log(JSON.stringify(doc, undefined, 2));
//     }, (e) => {
//         console.log('Unable to save', e);
//     });

module.exports = {User};