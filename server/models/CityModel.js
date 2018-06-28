const sequelize = require('../db')
const cityModel = '../schema/city.js'

const City = sequelize.import(cityModel)

// 插入城市数据
const createCity = async function (data) {
  await City.create({
    city_id: data.city_id,
    city_name: data.city_name,
    breviary: data.breviary
  })
  return true
}

// 批量插入城市数据
const bulkCreateCity = async function (data) {
  const result = await City.bulkCreate(data)
  return result
}

module.exports = {
  createCity,
  bulkCreateCity
}
