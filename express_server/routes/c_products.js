const router = require('express').Router();
const C_product = require('../models//c_product');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post("/:id", function (req, res) {
  let que1 = req.body.que1;
  let que2 = req.body.que2;
  let que3 = req.body.que3;
  let que4 = req.body.que4;
  let que5 = req.body.que5;
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
    //console.log(res);
    //console.log("C_result: " + JSON.stringify(todo));
  })
  .catch((err) => {
    console.log(err);
  });
});


router.post("/img/:id", function (req, res) {
  let result_id = req.body.result_id;
  console.log("result_id: " + result_id)
  
  C_product.findOne({_id: result_id})
  .then((item) => {
    res.send(item);
  })
  .catch((err) => {
    console.log(err);
  })
});


module.exports = router;