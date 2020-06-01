const router = require('express').Router();
const C_product = require('../models//c_product');
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

  C_product.findOne({
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

  C_product.find()
  .then((item) => {
    res.send(item);
    // console.log(item);
  })
  .catch((err) => {
    console.log(err);
  })
});


module.exports = router;