const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const path = require('path')
const router = require('./route/ticket')
const session = require('koa-session')
const sessionConfig = require('./config/session_config')

const CityModel = require('./models/CityModel')
const changeCityById = require('./service/changeCityById')
const getAddressByIp = require('./service/getAddressByIp')

const app = new Koa()

// session配置
app.keys = ['ticket_hack']

// 静态资源目录
const staticPath = './static'
app.use(serve(
  path.join(__dirname, staticPath)
))

// 注册中间件
app.use(bodyParser())
app.use(session(sessionConfig, app))

// 初始化接口返回格式
app.use(async (ctx, next) => {
  ctx.body = {
    code: 200,
    data: {},
    message: '请求成功！'
  }
  await next()
})

// 初始化地址
app.use(async (ctx, next) => {
  if (!ctx.session.city) {
    const addressDetail = await getAddressByIp('123.125.71.38')
    let cityId = 440100
    if (addressDetail.data.city) {
      const result = await CityModel.getCityCodeByIdOrName(addressDetail.data)
      if (result.city_id) {
        cityId = result.city_id
      }
    }
    const res = await changeCityById(cityId)
    ctx.session.city = res.headers['set-cookie'].join(';')
  }
  await next()
})
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(9500, () => {
  console.log('跑起来了啊')
})
