const router = require('express').Router();
const Todo = require('../models/todo');

Todo.create({
    name: "AP VI 5571",
    color: "black",
});

router.post("/products", function (req, res) {
     console.log("que1")
     let que1 = req.param("que1");
     
     Todo.find({
         color: que1,
     }, (err, res) => {
         console.log(res);
     });
});




   module.exports = router;