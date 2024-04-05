const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
  id: String,
  value: String,
  index: Number,
  checked: Boolean
})

TodoSchema.post('init', (todo) => {
  todo.id = todo._id
})

TodoSchema.post('save', (todo) => {
  todo.id = todo._id
  todo.update({ id: todo.id }, (err) => {
    if (err) console.log(err)
  })
})

const Todo = mongoose.model('Todo', TodoSchema)

exports.all = (req, res) => {
  console.log('Finding all todos')
  return Todo.find((err, todos) => {
    if (err) {
      throw new Error(err, req, res)
    }
    res.send(todos)
  })
}

exports.one = (req, res) => {
  var id = req.params.id
  console.log('Finding todo: ' + id)
  return Todo.findById(id, (err, todo) => {
    if (err) {
      throw new Error(err, req, res)
    }
    res.send(todo)
  })
}

exports.create = (req, res) => {
  console.log('Creating new todo: ' + JSON.stringify(req.body))
  var todo = new Todo(req.body)
  return todo.save((err) => {
    if (err) {
      throw new Error(err, req, res)
    }
    res.send(todo)
    console.log('Created new todo: ' + JSON.stringify(todo))
  })
}

exports.update = (req, res) => {
  var id = req.params.id
  console.log('Updating todo: ' + JSON.stringify(req.body))
  return Todo.findOneAndUpdate({'_id': id}, req.body, {}, (err, todo) => {
    if (err) {
      throw new Error(err, req, res)
    }
    res.send(todo)
  })
}

exports.delete = (req, res) => {
  var id = req.params.id
  console.log('Deleting todo: ' + id)
  return Todo.remove({'_id': id}, (err) => {
    if (err) {
      throw new Error(err, req, res)
    }
    res.send({})
  })
}
