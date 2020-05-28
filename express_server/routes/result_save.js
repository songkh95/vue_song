const router = require('express').Router();
const Results_save = require('../models/results_save');

router.get("/save", function (req, res) {
let answer1 = req.query.answer1;
let answer2 = req.query.answer2;
let answer2_1 = req.query.answer2_1;
let answer2_2 = req.query.answer2_2;
let answer3 = req.query.answer3;
let answer3_1 = req.query.answer3_1;
let answer4 = req.query.answer4;
let answer5 = req.query.answer5;
let answer6 = req.query.answer6;
let answer7 = req.query.answer7;
let answer7_1 = req.query.answer7_1;
let answer7_2 = req.query.answer7_2;
let answer7_3 = req.query.answer7_3;
let option_select = req.query.option_select;

  results_save = new Results_save({
    answer1: answer1,
    answer2: answer2,
    answer2_1: answer2_1,
    answer2_2: answer2_2,
    answer3: answer3,
    answer3_1: answer3_1,
    answer4: answer4,
    answer5: answer5,
    answer6: answer6,
    answer7: answer7,
    answer7_1: answer7_1,
    answer7_2: answer7_2,
    answer7_3: answer7_3,
    option_select: option_select
  });

  results_save.save(function(err, dc){
    if(err) return console.error(err);
    // console.dir(dc);
  });

});

router.get("/count", function(req,res){

  Results_save.find()
  .then((count) => {
    res.send(count);
  })
  .catch((err) => {
    console.log(err);
  })

});
module.exports = router;


