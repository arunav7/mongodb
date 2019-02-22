const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

//var todoId = '6c6fcd7be00b3d2490a1a0ce';  // id is valid but does not exist in DB
var userId = '5c6efc0fd7bb632fe04ba55a';

User.findById(userId).then((user) => {
    if(!user) {
        return console.log('User not found');
    }
    console.log(`User:\n${JSON.stringify(user, undefined, 2)}`);
}).catch((e) => {
    if(!ObjectID.isValid(userId)) {
        console.log(e);
    }
});

// returns documents in form of arrays
// Todo.find({
//     _id: todoId
// }).then((todos) => {
//     console.log(`Todos : ${todos}`);
// });

// // returns the first matching document by the filter
// Todo.findOne({
//     _id: todoId
// }).then((todo) => {
//     console.log(`Todo : ${todo}`);
// });

// // returns the matching document by id
// Todo.findById(todoId).then((todos) => {
//     if(!todos) {
//         return console.log('ID not found');
//     }
//     console.log(`Todos : ${todos}`);
// }).catch((e) => {
//     if(!ObjectID.isValid(todoId)) {
//         console.log(e);
//     }
// });


