const router = require('express').Router();
const B_product = require('../models/b_product');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get("/search", function (req, res) {
  let que1 = req.query.que1;
  let que2 = req.query.que2;
  let que3 = req.query.que3;
  let que4 = req.query.que4;
  let que5 = req.query.que5;
  //console.log("que1: " + que1 + "/ que2: " + que2 + "/ que3: " + que3 + "/ que4: " + que4 + "/ que5: " + que5)

  B_product.findOne({
    color: que1
    // print_speed: que2,
    // scan_speed: que3,
    // dpi: que4,
    // advantage: que5
  })
  .then((todo) => {
    res.send(todo);
  })
  .catch((err) => {
    console.log(err);
  });
  

});

router.get("/img", function (req, res) {

  B_product.find()
  .then((item) => {
    res.send(item);
  })
  .catch((err) => {
    console.log(err);
  })
});

module.exports = router;

// var dc = new B_product({
//   name: "AP VI 7771",
//   color: "color",
//   sale: '9,125,000',
//   print_speed: 'H',
//   scan_speed: 154,
//   dpi: '1200*2400',
//   tray: '4T',
//   advantage: 'C그룹'
// });

//  dc = new B_product({
//   name: "DC V2265",
//   color: "color",
//   sale: '3280000',
//   print_speed: 'M',
//   scan_speed: 55,
//   dpi: '1200*2400',
//   tray: '2T',
//   advantage: 'B그룹'
// });

// dc = new B_product({
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