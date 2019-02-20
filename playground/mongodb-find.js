//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true}, (err,client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server...');
    }
    console.log('Connected to MongoDB server..');
    const db = client.db('TodoApp');

    // toArray() returns the collection in form of an array, without it find method will not work
    // toArray() returns a promise if there is no callback called inside it.
    // db.collection('Users').find({
    //     _id: new ObjectID('5c6c4c494b7fb334c858403e')   // here _id is not a string that we can directly pass, it is an object of class ObjectID , so we have to pass it inside ObjectID class 
    // }).toArray().then((docs) => {
    //     console.log('Users');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log(err);
    // });

    // if we specify argument inside find then count() will give the count of documents having the argument as property
    // if no argument is provided, it will give the count of all the documents in the collection. 
    db.collection('Users').find().count().then((docs) => {
        console.log(`Users count : ${docs}`);
        //console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(err);
    });

    // toArray() with a callback
    // db.collection('Users').find({
    //     name: 'Deadshot'
    // }).toArray((err, docs) => {
    //     if(err) {
    //         return console.log('Unable to fetch data....', err);
    //     }
        
    //     console.log('Users');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // });

    
    client.close();
});