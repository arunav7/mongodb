//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true}, (err,client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server...');
    }
    console.log('Connected to MongoDB server..');
    const db = client.db('TodoApp');
 
    // deletes all the entry specified as the args
    db.collection('Users').deleteMany({name: 'Kenshi'}).then((result) => {
        console.log(result);
    }, (err) => {
        console.log(err);
    });

    db.collection('Todo').findOneAndDelete({
        _id: new ObjectID('5c6d99e737a1310ee088bb35')
    }).then((result) => {
        console.log(result);
    },(err) => {
        console.log(err);
    });

    // deletes only one entry with the specified as the args,regardless of any duplicate data
    // db.collection('Users').deleteOne({name: 'Liu'}).then((result) => {
    //     console.log(result);
    // });

    // finds and deletes the first document which has the property specified as an argument, 
    // regardless of any duplicate documents and it also returns the deleted document, unlike the other delete function
    // db.collection('Users').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });


    
    client.close();
});