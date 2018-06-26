const axios = require('axios')

// const cookie =
// 创建axios实例
const service = axios.create({
  baseURL: 'http://www.189mv.cn/', // api的base_url
  timeout: 15000, // 请求超时时间
  validateStatus: function (status) {
    return [200, 201, 204, 422, 401, 400, 404, 429, 403].indexOf(status) !== -1 // 默认的
  }
})

service.interceptors.response.use(
  response => {
    return response.data
  }
)

module.exports = service
