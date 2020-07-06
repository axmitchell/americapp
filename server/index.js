const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/map', (req, res) => {
  let geoJSON = JSON.parse(fs.readFileSync(path.join(__dirname + '/states.json')));
  Promise.all(geoJSON.features.map(async state => {
    let info = await axios.get(`https://covidtracking.com/api/v1/states/${state.properties.STUSPS.toLowerCase()}/${req.query.date}.json`)
    state.properties.date = info.data.date;
    state.properties.positiveIncrease = info.data.positiveIncrease;
    state.properties.positive = info.data.positive;
    state.properties.death = info.data.death;
  }))
  .then(() => res.json(geoJSON)) 
  .catch(console.log)
  // res.json(geoJSON)
});

module.exports = app;