const expect = require('expect');
const request = require('supertest');

const {app} = require ('./../server');
const {Todo} = require('./../models/todo')

beforeEach((done) => {
    //similiar to the MongoDB native method
    //passing in an empty object
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    //test the posting and response to our server with
    //an async test
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        //test our mongoDB collections and documents here by using the 
        //optional arguments with our end method to the above async test
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            //similiar to the MongoDB native find method
            //returns our todos collection - an array of objects with one document in it
            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                //expect the todos text property toBe the text variable above
                //{ text: 'Test todo text' }
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });

    });
    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            
            Todo.find().then((todos) => {
                expect(todos.length).toBe(0);
                done();
            }).catch((e) => done(e))
        })
    })
});