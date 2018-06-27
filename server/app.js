const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const path = require('path')
const router = require('./route/ticket')
const session = require('koa-session')
const sessionConfig = require('./config/session_config')
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
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(9500, () => {
  console.log('跑起来了啊')
})
