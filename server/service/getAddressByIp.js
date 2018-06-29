const request = require('../utils/request')

const getAddressByIp = async (ip) => {
  const result = await request({
    url: '/v3/ip',
    baseURL: 'http://restapi.amap.com',
    params: {
      key: '0d249f92a888b99f40c2ffe29f00e740',
      ip: ip
    }
  })
  return result
}

module.exports = getAddressByIp
