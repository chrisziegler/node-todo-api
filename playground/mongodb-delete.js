const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDb server');
    // DELETE METHODS deleteMany |  deleteOne |  findOneAndDelete (also returns the
    // deleted items)

    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    })

    // db.collection('Todos').deleteMany({test: 'juggle'}).then((result) => {
    //     console.log(result);
    // });

    // again closing connection will interfere with these statements 
    //db.close();
});
