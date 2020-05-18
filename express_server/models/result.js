const mongoose = require('mongoose');

// Define Schemes
const postSchema = mongoose.Schema({
  name:{type:String, require: true},
  content:{type:String, require: true},
  counter:{type:Number, required: true},
  date:{type:Date}
},
{
  collection: 'result'
});

// Create Model & Export
var result = mongoose.model('result', postSchema);
module.exports = result;

