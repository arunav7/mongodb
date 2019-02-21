//const MongoClient = require('mongodb').MongoClient;
// this is called object destructuring, which allows us to pull object's property with its value into a variable with the same name as property. We can pull multiple properties in a single statement
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true}, (err,client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server...');
    }
    console.log('Connected to MongoDB server..');
    const db = client.db('TodoApp');

    db.collection('Todo').insertOne({
        text: 'Promise Text',
        completed: true
    }).then((result) => {
        console.log(JSON.stringify(result.ops, undefined, 2));
    }).catch((err) => {
        console.log(err);
    });

    db.collection('Users').insertOne({
        name: 'Harsh',
        age: 23,
        completed: false
    }, (err, results) => {
        if(err) {
            return console.log('Unable to insert in db...');
        }
        console.log(JSON.stringify(results.ops[0]._id.getTimestamp(), undefined, 2));
    });
    
    client.close();
});