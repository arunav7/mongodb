const expect = require('expect');
const request = require('supertest');

var {Todo} = require('./../models/todos');
var {app} = require('./../server');

// this beforeEach block will run before each test case and wipe all the data because we are assuming that Db is empty
beforeEach((done) => {
    Todo.deleteMany({}).then(() => done());  
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
              Todo.find({}).then((todos) => {
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
         .end((err) => {
             if(err) {
                 return done(err);
             }

             Todo.find({}).then((todos) => {
                 expect(todos.length).toBe(0);
                 done();
             }).catch( e => done(e)); 
         });
    });
});