const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todos');
const {User} = require('../server/models/users');

//removes all the entries
// Todo.remove({}).then((result) => {
//     console.log(result);
//     mongoose.connection.close();
// });

// Todo.findOneAndRemove({_id:'5c706490683834222ca149ba'}).then();

Todo.findByIdAndRemove('5c706490683834222ca149ba').then((result) => {
    console.log(result);
    mongoose.connection.close();
});



