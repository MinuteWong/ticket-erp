const sequelize = require('../db')
const Sequelize = require('sequelize')

const Op = Sequelize.Op
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

// 根据城市名查询
const getCityCodeByIdOrName = async function (data) {
  const cityName = data.city.replace('市', '')
  const result = await City.findOne({
    'where': {
      [Op.or]: [
        {
          'city_name': {
            [Op.like]: cityName
          }
        },
        {
          city_id: data.adcode
        }
      ]
    }
  })
  return result
}

// 返回所有城市
const getAllCity = async function () {
  const result = await City.findAll({
    attributes: ['breviary', 'city_id', 'city_name']
  })
  return result
}

module.exports = {
  createCity,
  getAllCity,
  bulkCreateCity,
  getCityCodeByIdOrName
}
