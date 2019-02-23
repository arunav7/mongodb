const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/users');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());    // to tell the express that json data is being sent

app.post('/todos', (req, res) => {
    // var todo = new Todo({
    //     text: req.body.text            // text field of todo is set to the text property of the request body
    // });

    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/users', (req,res) => {
    var user = new User({
        email: req.body.email
    });

    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});

// to get all the todos

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (err) => {
        if(err) {
            res.status(400).send(err);
        }
    });
});

// to get todos by id

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;       // req.params is paramater passed in the url, in this case id is passed

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todos) => {
        if(!todos) {
            return res.status(404).send();
        }
        res.status(200).send({todos});
    },(err) => {
        if(err) {
            res.status(400).send(err);
        }
    });
    //res.send(req.params);
});

// to delete todos by id

app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todos) => {
        if(!todos) {
            return res.status(404).send();
        }
        res.status(200).send({todos});
    },(err) => {
        if(err) {
            res.status(400).send(err);
        }
    });
});

// updates the todos field by id

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // pick function picks the property(text and completed) if exists of req.body and stores in body object
    // because user can only update the text and completed property
    var body = _.pick(req.body,['text','completed']);

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todos) => {      // new is mongoose's option for returnOriginal of mongo
        if(!todos) {
            return res.status(404).send();
        }

        res.status(200).send({todos});
    }).catch((err) => res.status(404).send());

});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = {app};    // to export app to another file --> tesing purposes