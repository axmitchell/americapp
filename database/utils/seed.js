const axios = require('axios');
const csv = require('csv-parser')
const fs = require('fs')  
const Path = require('path')  
const db = require('../model.js');
const execSync = require('child_process').execSync;


const seedDb = (array) => {
  db.History.destroy({truncate: true, cascade: true, restartIdentity: true})
    .then(() => console.log('table sucessfully cleared'))
    .then(() => seedHistory(array))
    .catch(err => console.log('error clearing tables:', err));
}

const seedHistory = (array) => {
  db.History.bulkCreate(array)
    .then(() => console.log('history sucessfully seeded'))
    .catch(err => console.log('error creating history:', err));
};

const getHistory = async () => {  
  const originalCSV = Path.resolve(__dirname, 'original.csv')
  const modifiedCSV = Path.resolve(__dirname, 'modified.csv')
  const writer = fs.createWriteStream(originalCSV)

  const response = await axios({
    url: 'https://covidtracking.com/api/v1/states/daily.csv',
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  writer.on('finish', () => {
    execSync(`awk -F, 'BEGIN {OFS=","} { print $1, $2, $3, $13, $14, $17, $27 }' ${originalCSV} > ${modifiedCSV}`)
    console.log('modified csv is ready!')
    let results = [];
    fs.createReadStream(modifiedCSV)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          'date': Number(data.date),
          'state': data.state,
          'positive': Number(data.positive),
          'dataQualityGrade': data.dataQualityGrade,
          'lastUpdateEt': data.lastUpdateEt,
          'death': Number(data.death),
          'positiveIncrease': Number(data.positiveIncrease)
        })
      })
      .on('end', () => {
        seedDb(results)
      });
  })
  writer.on('error', console.log)
}

getHistory();
