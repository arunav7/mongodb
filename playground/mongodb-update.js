//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true}, (err,client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server...');
    }
    console.log('Connected to MongoDB server..');
    const db = client.db('TodoApp');
    
    
    // it takes 4 args. 1st arg is filter which is an object which is used to identify
    // the document to be modified by _id property(in this case but in general we can use any property of a doc).
    // 2nd arg is an mongodb update operator which is used to modify the value of a document, followed by $ sign
    // 3rd arg is an option provided to the function to work ina specific way
    // 4th arg is a callback, if not passed promise is returned by the fuction 
    db.collection('Todo').findOneAndUpdate({
        _id: new ObjectID('5c6c4af02f320d22b4346d25')
    }, {
        $set: {
            text: 'Updated Text'
        }
    }, {
        returnOriginal: false         // returnOriginal has the default value as true, which returns original document not the updated one. 
                                      // By setting it false we will get the updated document.
    }).then((res) => {
        console.log(res);
    });

    db.collection('Users').findOneAndUpdate({
        name: 'Harsh'
    }, {
        $set: {
            name: 'Brian'
        } , 
        $inc: {
            age: 10
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });

    // findoneandupdate() with a callback
    // db.collection('Todo').findOneAndUpdate({
    //         _id: new ObjectID('5c6c4af02f320d22b4346d25')
    //     }, {
    //         $set: {
    //             text: 'Updated Text I'
    //         }
    //     }, {
    //         returnOriginal: false
    //     }, (err, result) => {
    //         if(err) {
    //             console.log(err)
    //         } else {
    //             console.log(result);
    //         }
    // });
    
    client.close();
});