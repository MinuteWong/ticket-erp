const request = require('../utils/request')
const getCityList = async (ctx, next) => {

}

const changeCity = async (ctx, next) => {
  const result = await request({
    url: '/xhgCity.htm',
    methods: 'post',
    data: {cityid: ctx.request}
  })
  return result
}

module.exports = {
  getCityList,
  changeCity
}
