const Sequelize = require('sequelize');
// require('dotenv').config();

// const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize('covid', {
  // host: DB_HOST,
  dialect: 'postgres',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('db connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
