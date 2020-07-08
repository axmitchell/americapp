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

let states = ['al','ar','az','ca','co','ct','dc','de','fl','ga','ia','id','il','in','ks','ky','la','ma','md','me','mi','mn','mo','ms','mt','nc','nd','ne','nh','nj','nm','nv','ny','oh','ok','or','pa','ri','sc','sd','tn','tx','ut','va','vt','wa','wi','wv','wy']

app.get('/data', (req, res) => {
  Promise.all(states.map(async state => {
    let covidInfo = await axios.get(`https://covidtracking.com/api/v1/states/${state}/${req.query.date}.json`)
    let stateInfo = {
      state: covidInfo.data.state,
      lastUpdate: covidInfo.data.lastUpdateEt,
      positiveIncrease: covidInfo.data.positiveIncrease,
      positive: covidInfo.data.positive,
      death: covidInfo.data.death,
    }
    return stateInfo
  }))
    .then((data) => res.send(data))
    .catch(console.log)
})

app.get('/map', (req, res) => {
  let geoJSON = JSON.parse(fs.readFileSync(path.join(__dirname + '/states.json')));
  res.json(geoJSON)
});

module.exports = app;