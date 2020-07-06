const express = require('express');
const fs = require('fs');
const app = express();
var path = require('path');

app.use('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let json = fs.readFileSync(path.join(__dirname + '/states.json'));
  res.json(JSON.parse(json));
});

module.exports = app;