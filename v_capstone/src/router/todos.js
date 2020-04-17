const router = require('express').Router();
const Todo = require('../models/todo');

Todo.create({
  name: "AP VI 5571@",
  color: "칼라",
  lease: "임대",
  sale: "판매",
  opiton: "yes",
  Print_Speed: {
      Print_B_Speed: 55,
      Print_C_Speed: 55
  },
  level: "H",
  Scan_Speed: {
      Scan_B_Speed: 154,
      Scan_C_Speed: 154
  },
  dpi: "1200*2400",
  tray: "2T"
});

// Find All
router.get('/', (req, res) => {
  Todo.findAll()
    .then((todos) => {
      if (!todos.length) return res.status(404).send({ err: 'Todo not found' });
      res.send(`find successfully: ${todos}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by todoid
router.get('/todoid/:todoid', (req, res) => {
  Todo.findOneByTodoid(req.params.todoid)
    .then((todo) => {
      if (!todo) return res.status(404).send({ err: 'Todo not found' });
      res.send(`findOne successfully: ${todo}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new todo document
router.post('/', (req, res) => {
  Todo.create(req.body)
    .then(todo => res.send(todo))
    .catch(err => res.status(500).send(err));
});

// Update by todoid
router.put('/todoid/:todoid', (req, res) => {
  Todo.updateByTodoid(req.params.todoid, req.body)
    .then(todo => res.send(todo))
    .catch(err => res.status(500).send(err));
});

// Delete by todoid
router.delete('/todoid/:todoid', (req, res) => {
  Todo.deleteByTodoid(req.params.todoid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;