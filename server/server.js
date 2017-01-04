var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    console.log('Saving todo', doc);
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
    console.log('Unable to save todo', e);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
    console.log('Could not find todos', e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid id');
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }, (e) => {
    res.status(400).send(e);
    console.log('Could not find todo with id', id);
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid id');
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }, (e) => {
    res.status(400).send(e);
    console.log('Could not find todo with id', id);
  });
  //get id
  //
  //validate id, 404
  //
  //remove todo by id
  //  success
  //    if no doc send 404
  //    if doc send doc w 200
  //  error 400
})

app.listen(port, () => {
  console.log('Server started on port', port);
});

module.exports = {app};
