const request = require('../utils/request')

const getAddressByIp = async (ip) => {
  const result = await request({
    url: '/v3/ip',
    baseURL: 'http://restapi.amap.com',
    params: {
      key: '9955261b7bcaff4048f892bbba68ff37',
      ip: ip
    }
  })
  return result
}

module.exports = getAddressByIp
