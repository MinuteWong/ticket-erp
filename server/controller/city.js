const changeCityById = require('../service/changeCityById')
const CityModel = require('../models/CityModel')
const getCityList = async (ctx, next) => {
  const result = await CityModel.getAllCity()
  ctx.body.data = result
  next()
}

const changeCity = async (ctx, next) => {
  const result = await changeCityById(ctx.request.body.cityid, ctx.session.city)
  ctx.body.data = result.data
  next()
}

module.exports = {
  getCityList,
  changeCity
}
