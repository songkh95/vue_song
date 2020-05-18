const mongoose = require('mongoose');

// Define Schemes
const questionSchema = mongoose.Schema({
  _id:{type:String, require: true},
  title:{type:String, require: true},
  select:[
    {
      value:{type:String, require: true},
      text:{type:String, require: true}
    }
  ],
  subquestions:[
    {
      _id:{type:String, require: true},
      title:{type:String, require: true},
      selects:[
        {
          value:{type:String, require: true},
          text:{type:String, require: true}
        }
      ]
    }
  ]
},
{
  collection: 'questions'
});

// Create Model & Export
module.exports = mongoose.model('Question', questionSchema);

