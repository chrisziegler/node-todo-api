const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

const id = '59f102adde3d59cc3b6490af';
const userId ='59ee3ae9811e87b02ced892b';
if (!ObjectID.isValid(id) || !ObjectID.isValid(userId)) {
    console.log('ID not valid');
}
 //mongoose automatically converts our string to the ObjectID
// Todo.find({
//     _id: id
// })
//     .then((todos) => {
//         console.log('Todos: ', todos);
//     });

// //findOne - nearly identical syntax to find()
// Todo.findOne({_id: id})
//     .then((todo) => {
//         console.log('Todo: ', todo);
//     });

//Specific for id's
Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Todo ID not found');
    }
        console.log('Todo: ', todo);
    }).catch((e) => {
        console.log(e);
    })

User.findById(userId).then((user) => {
    if (!user) {
         //the id can be valid mongodb format, but not exist
         return console.log('User ID not found')
    }
    console.log('User: ', user);
    //handle deprecation error handling requirement 
    //and catch any other types of errors that may occur
}).catch((e) => {
    console.log(e)
})