const router = require('express').Router();
const Question = require('../models/question');

router.get("/:id", function (req, res) {
  // console.log("question: " + req.params.id);
  Question.findById(req.params.id)
  .then((question) => {
    res.send(question);
  })
  .catch((err) => {
    console.log(err);
  })
});

module.exports = router;