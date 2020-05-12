const router = require('express').Router();
const Todo = require('../models/todo');
const bodyParser = require('body-parser');
const fs = require('fs');
// const multer = require('multer');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post("/:id", function (req, res) {
  let que1 = req.body.que1;
  let que2 = req.body.que2;
  let que3 = req.body.que3;
  let que4 = req.body.que4;
  let que5 = req.body.que5;
  //console.log("que1: " + que1 + "/ que2: " + que2 + "/ que3: " + que3 + "/ que4: " + que4 + "/ que5: " + que5)

  Todo.findOne({
    color: que1
    // print_speed: que2,
    // scan_speed: que3,
    // dpi: que4,
    // advantage: que5
  })
  .then((todo) => {
    res.send(todo);
    //console.log(res);
    console.log("result: " + JSON.stringify(todo));
  })
  .catch((err) => {
    console.log(err);
  });
});

router.post("/img/:id", function (req, res) {
  let result_id = req.body.result_id;
  console.log("result_id: " + result_id)
  Todo.findOne({_id: result_id})
  .then((item) => {
    res.send(item);
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get("/count", function (req, res) {
  Todo.count()
  .then((count) => {
    res.send(count);
  })
  .catch((err) => {
    console.log(err);
  })
});

module.exports = router;

// var dc = new Todo({
//   name: "AP VI 7771",
//   color: "color",
//   sale: '9,125,000',
//   print_speed: 'H',
//   scan_speed: 154,
//   dpi: '1200*2400',
//   tray: '4T',
//   advantage: 'C그룹'
// });

//  dc = new Todo({
//   name: "DC V2265",
//   color: "color",
//   sale: '3280000',
//   print_speed: 'M',
//   scan_speed: 55,
//   dpi: '1200*2400',
//   tray: '2T',
//   advantage: 'B그룹'
// });

// dc = new Todo({
//   name: "DC V2060",
//   color: "black",
//   sale: '2300000',
//   print_speed: 'M',
//   scan_speed: 55,
//   dpi: '1200*1200',
//   tray: '2T',
//   advantage: 'A그룹'
// });

// dc.save(function(err, dc){
//   if(err) return console.error(err);
//   console.dir(dc);
// });