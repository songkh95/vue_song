const mongoose = require('mongoose');

// Define Schemes
const postSchema = mongoose.Schema({
  _id:{type:String, require: true},
  name:{type:String, require: true},
  color:{type:String, require: true},
  dpi:{type:String, require: true},
  print_speed:{type:String, require: true},
  print_speed_level:{type:String, require: true},
  scan_speed:{type:String, require: true},
  fax:{type:String, require: true},
  sale:{type:String, require: true},
  content:{type:String, require: true},
  group:{type:String, require: true},
  subheading:{type:String, require: true},
  support:{type:String, require: true}, 
  tray_standard:{type:String, require: true}, 
  tray_optopn:{type:String, require: true}, 
  tray_max:{type:String, require: true}, 
  fax_kit:{type:String, require: true},
  side_tray:{type:String, require: true}, 
  ps_3_kit:{type:String, require: true}, 
  advantage:{type:String, require: true},
},
{
  collection: 'b_products'
});

// Create Model & Export
var b_products = mongoose.model('B_product', postSchema);
module.exports = b_products;

