const Koa = require('koa')
const request = require('./utils/request')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const path = require('path')
const cheerio = require('cheerio')
const vm = require('vm')

const app = new Koa()
const router = new Router()

const staticPath = './static'
app.use(serve(
  path.join(__dirname, staticPath)
))

router.get('/', async (ctx, next) => {
  const result = await request({
    url: '/',
    method: 'get'
  })
  const $ = cheerio.load(result)
  ctx.type = 'html'
  const filmListEle = $('head').find('script')
  const sandbox = {}
  vm.createContext(sandbox)
  vm.runInContext(filmListEle.html(), sandbox)
  ctx.body = sandbox.hotFilms
  next()
})

app.use(bodyParser())
app.use(router.routes())

app.listen(9500, () => {
  console.log('跑起来了啊')
})
