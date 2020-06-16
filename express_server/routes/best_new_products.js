const router = require('express').Router();
const Best_new_product = require('../models/best_new_product');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.get("/img", function (req, res) {

  Best_new_product.find()
  .then((item) => {
    res.send(item);
    // console.log(item);
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get("/product", function (req, res) {
  let product_name = req.query.product_name;

  Best_new_product.findOne({
    name: product_name
  })
  .then((item) => {
    res.send(item);
    console.log(item);
  })
  .catch((err) => {
    console.log(err);
  })
});



module.exports = router;