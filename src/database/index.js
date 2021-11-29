const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'blogdb', 
  'root', 
  '35753159', 
  { dialect: 'mysql'
  })

module.exports = sequelize