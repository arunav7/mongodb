const expect = require('expect');    // currently version 1.20.2 is being used
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {Todo} = require('./../models/todos');
var {app} = require('./../server');

const todos = [{
    _id: new ObjectID(),
    text: 'First Todo Text'
},{
    _id: new ObjectID(),
    text: 'Second Todo Text',
    completed: true
}];

// this beforeEach block will run before each test case and wipe all the data because we are assuming that Db is empty
beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        Todo.insertMany(todos);   // adding seed data into db so as to get todo from DB for GET /todos
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

describe('GET /todos/:id',() => {
    it('shuld get todo by id', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('shuld return 404 if id not found',(done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('shuld return 400 for invalid id',(done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id',() => {
    it('should delete todo',(done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos._id).toBe(hexId);
            })
            .end((err,res) => {
                if(err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todos) => {
                    expect(todos).toBeFalsy();
                    done();
                }).catch( err => done(err) );
            });
    });

    it('should return 404 if id not found',(done) => {
        var hexId = new ObjectID().toHexString();
        request(app).delete(`/todos/${hexId}`).expect(404).end(done);
    });

    it('should return 400 for invalid id',(done) => {
        request(app).delete(`/todos/23notvalidId`).expect(404).end(done);
    });

});

describe('PATCH /todos/:id', () => {
    it('should update a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'Patch test case 1';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.findById(hexId).then(() => {
                    expect(res.body.todos.text).toBe(text);
                    expect(res.body.todos.completed).toBe(true);
                    expect(res.body.todos.completedAt).toBeA('number');
                    done();
                }).catch( e => done(e));
            });
    });

    it('should change completedAt to null if completed is false', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'Patch test case 2';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.findById(hexId).then(() => {
                    expect(res.body.todos.text).toBe(text);
                    expect(res.body.todos.completed).toBe(false);
                    expect(res.body.todos.completedAt).toBeFalsy();
                    done();
                }).catch( e => done(e));
            });
    });
});


// this approach is completely fine, also better
// describe('PATCH /todos/:id', () => {
//     it('should update a todo', (done) => {
//         var hexId = todos[0]._id.toHexString();
//         var text = 'Patch test case 1';

//         request(app)
//             .patch(`/todos/${hexId}`)
//             .send({
//                 text,
//                 completed: true
//             })
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todos.text).toBe(text);
//                 expect(res.body.todos.completed).toBe(true);
//                 expect(res.body.todos.completedAt).toBeA('number');
//             })
//             .end(done);
//     });

//     it('should change completedAt to null if completed is false', (done) => {
//         var hexId = todos[1]._id.toHexString();
//         var text = 'Patch test case 2';

//         request(app)
//             .patch(`/todos/${hexId}`)
//             .send({
//                 text,
//                 completed: false
//             })
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todos.text).toBe(text);
//                 expect(res.body.todos.completed).toBe(false);
//                 expect(res.body.todos.completedAt).toBeFalsy();
//             })
//             .end(done);
//     });
// });