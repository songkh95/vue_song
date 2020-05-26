const mongoose = require('mongoose');

// Define Schemes
const postSchema = mongoose.Schema({
  answer1:{type:String, require: true},
  answer2:{type:String, require: true},
  answer2_1:{type:String, require: true},
  answer2_2:{type:String, require: true},
  answer3:{type:String, require: true},
  answer3_1:{type:String, require: true},
  answer4:{type:String, require: true},
  answer6:{type:String, require: true},
  answer7:{type:String, require: true},
  answer7_1:{type:String, require: true},
  answer7_2:{type:String, require: true},
  answer7_3:{type:String, require: true}
},
{
  collection: 'result_save'
});

// Create Model & Export
var result_save = mongoose.model('Result_save', postSchema);
module.exports = result_save;

