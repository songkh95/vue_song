const router = require('express').Router();
const Result = require('../models/result');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.post("/:id", function (req, res) {
  // const result = new Result();
   let name = req.body.customer_name;
   let first_results = req.body.first_results;
   //let result_count = req.body.result_count;
   let date = new Date();

 
   Result.findByIdAndUpdate('5ec136116e5a5e77ad3f89fb', {$inc: {counter: 1}}, {new: true})
   .then((count) => {
     res.send(count);
     console.log(JSON.stringify(count))
   })
   .catch((err) => {
     console.log(err);
   })

  var result = new Result({

    name: name,
    content: first_results,
    date: date
  });

  

  result.save(function(err, dc){
    if(err) return console.error(err);
    console.dir(dc);
  });

  

});

module.exports = router;