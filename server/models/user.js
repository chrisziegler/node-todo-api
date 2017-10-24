var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        //prevents empty string input case
        minLength: 1,
        //trim off leading or trailing whitespace
        trim: true
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