const request = require('../utils/request')

const changeCityById = async (cityid, cookie = {}) => {
  const result = await request({
    url: '/xhgCity.htm',
    methods: 'post',
    params: { cityid },
    headers: { cookie }
  })
  return result
}

module.exports = changeCityById
