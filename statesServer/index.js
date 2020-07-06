const express = require('express');
const axios = require('axios');
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
  let json = JSON.parse(fs.readFileSync(path.join(__dirname + '/states.json')));
  // console.log(json.features[0].properties.STUSPS);
  axios.get('https://covidtracking.com/api/v1/states/current.json')
    .then(states => {
      json.features.forEach(state => {
        states.data.forEach(info => {
          if (state.properties.STUSPS === info.state) {
            state.properties.positiveIncrease = info.positiveIncrease;
          }
        });
      });
      res.json(json);
    })
    .catch(console.log);
});

// axios.get('https://covidtracking.com/api/v1/states/current.json')
//   .then(res => {
//     json.features.forEach(state => {
//       res.data.forEach(info => {
//         if (state.properties.STUSPS === info.state) {
//           state.properties.positiveIncrease = info.positiveIncrease;
//         }
//       });
//     });
//     // const {state, checkTimeEt, positiveIncrease} = res.data[0];
//     // console.log(state, checkTimeEt, positiveIncrease);

//   })
//   .catch(console.log);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

module.exports = app;