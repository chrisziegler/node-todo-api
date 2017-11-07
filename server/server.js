require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

//note we don't use the mongoose variable anywhere in server, importing that file alone
//is what initializes the connection with MongoDB and configures mongoose. 
const {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');


const app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        //not even ObjectId syntax e.g. 123
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }, (e) => res.status(404).send());
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
  //pick method to select a subset of user accessable props
    
    let body =_.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
  
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    //$set aMongoDb operators like $increment
    //3rd arg are options - new here same as returnOriginal: false in MongoDB
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => res.status(400).send());
});


//POST /users authentication
app.post('/users', (req, res) => {
    const body =_.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

//first private route
app.get('/users/me', authenticate, (req, res) => {
   res.send(req.user);
});


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

 module.exports = { app };