// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
//const port = process.env.PORT || 8080;

const Todo = require('./src/models/todo');

// Static File Service
app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTERS
//app.use('/todos', require('./src/router/todos'));
const router = require('express').Router();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/clean');
let db = mongoose.connection;

//console.log(db)
db.once('open', function () {
  console.log('DB connected');
});
db.on('error', function (err) {
  console.log('DB ERROR : ', err);
});

const model = mongoose.model("song", Todo.song);

// app.post("/home", function (req, res) {
//   let Que1 = req.param("Que1");

//   let Que2 = req.param("Que2");
//   let Que2_1 = req.param("Que2_1");
//   let Que2_2 = req.param("Que2_2");

//   let Que3 = req.param("Que3");
//   let Que3_1 = req.param("Que3_1");
//   let Que3_2 = req.param("Que3_2");
//   let Que3_3 = req.param("Que3_3");

//   let Que4 = req.param("Que4");
//   let Que4_1 = req.param("Que4_1");
//   let Que4_2 = req.param("Que4_2");

//   console.log(`                 Que1:${Que1} 
//                Que2:${Que2} / Que2_1: ${Que2_1} / Que2_2: ${Que2_2}  
//                Que3: ${Que3} / Que3_1: ${Que3_1} / Que3_2: ${Que3_2} / Que3_3: ${Que3_3} 
//                Que4: ${Que4} / Que4_1: ${Que4_1} / Que4_2: ${Que4_2} `);

//   model.find({
//       color: Que1,
//       lease: Que3,
//       level: Que4,
//       Scan_B_Speed: Que4_1,
//       Scan_C_Speed: Que4_2
//   }, (err, res) => {
//       console.log(res);
//   });
// });

// 뷰 - 서버 - 데베 이 관계에서 
                  // 1. 데이터베이스의 document의 값을 가져와 서버로 보낸다.
                  // 2. 뷰 파일에서 input, radio 태그로 가져온 value를  axiso를 통해서 서버로 값을 전송
                  // 3. 서버에서 데베 값과 뷰에서의 값을 비교하여 결과를 vue 파일에 다시 전송해준다.

module.exports = router;

app.listen(8080, function () {
  console.log('conneted 8080 port!');
});