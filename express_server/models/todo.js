const mongoose = require('mongoose');

// Define Schemes
const postSchema = mongoose.Schema({
  name:{type:String, require: true},
  color:{type:String, require: true}
},
{
  collection: 'todos'
});

// Create Model & Export
let todos = mongoose.model('Todo', postSchema);
module.exports = todos;

