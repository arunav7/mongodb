const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/users');

var app = express();

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

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (err) => {
        if(err) {
            res.status(400).send(err);
        }
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

module.exports = {app};    // to export app to another file --> tesing purposes