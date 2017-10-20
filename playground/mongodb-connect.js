
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDb server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo');
    //     }
    //     //pretty print the success case
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    // });
    
    // db.collection('Users').insertOne({
    //     name: 'Chris Ziegler',
    //     age: 50,
    //     location: 'Pullman, WA'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo');
    //     }
    //     //pretty print the success case
    //     // console.log(JSON.stringify(result.ops, undefined, 4));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });
    // db.close();
});