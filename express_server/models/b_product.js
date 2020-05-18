const mongoose = require('mongoose');

// Define Schemes
const postSchema = mongoose.Schema({
  _id:{type:String, require: true},
  img:{data: Buffer, contentType: String},
  name:{type:String, require: true},
  color:{type:String, require: true},
  sale:{type:String, require: true},
  print_speed:{type:String, require: true},
  scan_speed:{type:String, require: true},
  dpi:{type:String, require: true},
  tray:{type:String, require: true},
  advantage:{type:String, require: true},
},
{
  collection: 'b_products'
});

// Create Model & Export
var b_products = mongoose.model('B_product', postSchema);
module.exports = b_products;

