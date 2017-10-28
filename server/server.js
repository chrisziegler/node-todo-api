var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//note we don't use the mongoose variable anywhere in server, importing that file alone
//is what initializes the connection with MongoDB and configures mongoose. 
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET /todos/123456
app.get('/todos/:id', (req, res) => {
    // res.send(req.params); 
    // { id: '59f102adde3d59cc3b6490af' }
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        //not even ObjectId syntax e.g. 123
        return res.status(404).send();
    }

    Todo.findById(id).then( (todo) => {
        if (!todo) {
            //valid ObjectID no matching record
            return res.status(404).send();
        }
            res.send({todo});
            //other errors handling
        }, (e) => res.status(400).send());

});


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

 module.exports = { app };