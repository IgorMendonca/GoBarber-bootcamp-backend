const { Sequelize } = require('sequelize');
const databaseconfig = require('./config/database');

const sequelize = new Sequelize(databaseconfig);

async function testeConnection() {
  await sequelize.authenticate();
  console.log('Comunicação ok');
}

testeConnection();
