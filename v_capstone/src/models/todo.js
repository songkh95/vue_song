const mongoose = require('mongoose');

// Define Schemes
const postSchema = mongoose.Schema({
  name:{type:String, require: true},
  color:{type:String, require: true},
  lease:{type:String, require: true},
  sale:{type:String, require: true},
  opiton:{type:String, require: true},
  Print_Speed:{
      Print_B_Speed:{type:Number, require: true},
      Print_C_Speed:{type:Number, require: true}
  },
  level:{type:String, require: true},
  Scan_Speed:{
      Scan_B_Speed:{type:Number, require: true},
      Scan_C_Speed:{type:Number, require: true}
  },
  dpi:{type:String, require: true},
  tray:{type:String, require: true},
});

// Create Model & Export
let song = mongoose.model('song', postSchema);
module.exports = song;