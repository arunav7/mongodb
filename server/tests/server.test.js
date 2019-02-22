const expect = require('expect');
const request = require('supertest');

var {Todo} = require('./../models/todos');
var {app} = require('./../server');

const todos = [{
    text: 'First Todo Text'
},{
    text: 'Second Todo Text'
}];

// this beforeEach block will run before each test case and wipe all the data because we are assuming that Db is empty
beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        Todo.insertMany(todos);   // adding seed data into db so as to get todo from DB
    }).then(() => done());  
});

describe('POST /todos', () => {
    it(`shuld create the todos`, (done) => {
        var text = "Text from the Test Case";

        request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect((res) => {
            expect(res.body.text).toBe(text);
          })
          .end((err,res) => {
              if(err) {
                  return done(err);
              }

              // todos.length will retuen number of documents in DB, in this case we assume that only one document
              // is in DB after tc executes
              Todo.find({text}).then((todos) => {     // it will find the doc only with the property text which is declared in this tc
                  expect(todos.length).toBe(1);       
                  expect(todos[0].text).toBe(text);
                  done();
              }).catch( e => done(e));
          });
    });

    it('shuld not create todos with bad data', (done) => {
        request(app)
         .post('/todos')
         .send()
         .expect(400)
         .end((err,res) => {
             if(err) {
                 return done(err);
             }

             Todo.find().then((todos) => {
                 expect(todos.length).toBe(2);  // adding length to 2 because we added 2 seed data
                 done();
             }).catch( e => done(e)); 
         });
    });
});

describe('GET /todos', () => {
    it('shuld get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});