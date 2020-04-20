// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
//const port = process.env.PORT || 8080;



// Static File Service
// app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/clean');
let db = mongoose.connection;
app.use(cors());
//console.log(db)
db.once('open', function () {
  console.log('DB connected');
});
db.on('error', function (err) {
  console.log('DB ERROR : ', err);
});

app.use('/todos', require('./routes/todos'));

app.listen(8081, function () {
  console.log('conneted 8081 port!');
});



// model.create({
//     name: "AP VI 5571",
//     color: "칼라",
//     lease: "임대",
//     sale: "판매",
//     opiton: "yes",
//     Print_Speed: {
//         Print_B_Speed: 55,
//         Print_C_Speed: 55
//     },
//     level: "H",
//     Scan_Speed: {
//         Scan_B_Speed: 154,
//         Scan_C_Speed: 154
//     },
//     dpi: "1200*2400",
//     tray: "2T"
// });