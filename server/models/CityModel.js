const sequelize = require('../db')
const Sequelize = require('sequelize')

const City = sequelize.define('city', {
  breviary: Sequelize.STRING,
  city_id: Sequelize.STRING,
  city_name: Sequelize.STRING
})

module.exports = City
