const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
var path = require('path');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', (req, res) => {
  let json = fs.readFileSync(path.join(__dirname + '/states.json'));
  res.json(JSON.parse(json));
});

// app.use('/', (req, res) => res.send('HI'));
// app.use(express.static(__dirname + '/states.json'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

module.exports = app;