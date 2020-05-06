const router = require('express').Router();
const Todo = require('../models/todo');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post("/:id", function (req, res) {
  let que1 = req.body.que1;
  console.log("que1: " + que1)

  Todo.findOne({
    name: que1,        //색
  })
  .then((todo) => {
    res.send("asd: " + todo);
    // console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
});

// , (err, res) => {
//   console.log("결과: " + res);

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