
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDb server');

     db.collection('Users').find({
        name: 'Chris'
     }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 4));
     }, (err) => {
        console.log('Unable to find User');
     });

    // //simply counts documents(records)
    //  db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    //  }, (err) => {
    //     console.log('Unable to find todos');
    //  });
            
        // db.close();

    //access the collection, find() doesn't require any arguments
    //but returns something called a cursor, we'll chain a common method to it
    //toArray returns a promise
    // db.collection('Todos').find({
    //     _id: new ObjectID("59e8f72af166b138947992f1")
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 4));
    //  }, (err) => {
    //     console.log('Unable to find todos');
    //  });
            


    
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

    //    db.close();
});
