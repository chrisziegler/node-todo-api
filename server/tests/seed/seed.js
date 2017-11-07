const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'chris@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        //we do need to reference _id inside this call
        //since its provided right here we need to make that 
        //a seperate variable outside this users array
        //no idea why we don't need to use .toHexString() on it here
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass'
}];

const todos =[{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

//need to populate Users but can't use insetMany()
//which wont run on middleware needed to hash passwords
//so that method would store plain text passwords in seeded db
const populateUsers = (done) => {
    User.remove({}).then(() => {
        //create 2 promises
        //and by using save() we will be using middleware
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
        //wait for both of them to succeed
        //this then callback will not get called
        //until all promises resolved
        //we return it to chain on then => done()
        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };