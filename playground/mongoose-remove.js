const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((results) => {
//     console.log(results);
// });

// Todo.findOneAndRemove({text: 'something to do'}).then((result) => {
//     console.log(result)
// })

Todo.findByIdAndRemove('59f752b3a6608d680a1bd2c6').then((todo) => {
    console.log(todo);
});
