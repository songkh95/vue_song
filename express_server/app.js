require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/clean');
let db = mongoose.connection;

db.once('open', function () {
  console.log('DB connected');
});
db.on('error', function (err) {
  console.log('DB ERROR : ', err);
});

app.use(cors());
app.use('/b_products', require('./routes/b_products'));
app.use('/c_products', require('./routes/c_products'));
app.use('/questions', require('./routes/questions'));
app.use('/mail', require('./routes/mail'));
app.use('/result_save', require('./routes/result_save'));

app.listen(8081, function () {
  console.log('conneted 8081 port!');
});