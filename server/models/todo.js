//we don't need the mongoose configuration file we created in <db/>
//we just need its model method
//we can load up regular mongoose library
var mongoose = require('mongoose')

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        //prevents empty string input case
        minLength: 1,
        //trim off leading or trailing whitespace
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        //with completed defaulting to false, should not have timestamp
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    }
});

// var newTodo = new Todo({
//     text: 'Practice guitar'
// });

//Save to db, use then on our Promise, print out document in success case
// newTodo.save().then((doc) => {
//         console.log(JSON.stringify(doc, undefined, 2));
//     }, (e) => {
//         console.log('Unable to save', e);
//     });

module.exports = {Todo};