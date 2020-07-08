const Sequelize = require('sequelize');
const sequelize = require('./connection.js');

const History = sequelize.define('history', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  positive: {
    type: Sequelize.INTEGER,
  },
  lastUpdateEt: {
    type: Sequelize.STRING,
  },
  death: {
    type: Sequelize.INTEGER,
  },
  dataQualityGrade: {
    type: Sequelize.STRING,
  },
  positiveIncrease: {
    type: Sequelize.INTEGER,
  },
},
{
  freezeTableName: true,
  timestamps: false,
});

module.exports = {
  History,
};