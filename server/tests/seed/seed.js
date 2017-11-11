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
       //required storing ids outside array to access value below
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass'
}];

const todos =[{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

//the insertMany() method used in populateTodos won't run on middleware
//needed to hash psswds. Promises used instead.
const populateUsers = (done) => {
    User.remove({}).then(() => {
        //create 2 promises - save() we will be using middleware
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
        //wait for both of them to succeed
        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };