const router = require('express').Router();
const Todo = require('../models/todo');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

router.post("/products", function (req, res) {
  let que1 = req.body.que1;
  let que3 = req.body.que3;
  let que3_1 = req.body.que3_1;
  let que4 = req.body.que4;
  let que6 = req.body.que6;

  console.log(que1, que3, que3_1, que4, que6)

  Todo.find({
    color: que1,        //색
    print_speed: que3,  //프린트 속도
    scan_speed: que3_1, //스캔 속도
    dpi: que4,          //프린트 해상도
    advantage: que6     // 장점
  }, (err, res) => {
    console.log(res);
  });
});

router.get('/qqq', (req, res) => {
  Todo.find()
    .then((todos) => {
      if (!todos.length) return res.status(404).send({
        err: 'Todo not found'
      });
      res.send(`find successfully: ${todos}`);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/color/:color', (req, res) => {
  Todo.findOne({ color: req.body.color })
    .then((todos) => {
      res.send(todos); 
    })
    .catch((error) => {
      console.log(error);
    })
})


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