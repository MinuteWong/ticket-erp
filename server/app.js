const Koa = require('koa')
const request = require('./utils/request')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const path = require('path')
const cheerio = require('cheerio')

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
  const filmListEle = $('#dvfilm .l_c1_1')
  //   console.log(filmListEle.find('li'))
  const filmList = []
  filmListEle.each(function () {
    console.log($(this).find('a').length)
    const film = $(this).find('a').text()
    filmList.push(film)
  })
  ctx.body = `${filmListEle.html()}`
  next()
})

app.use(bodyParser())
app.use(router.routes())

app.listen(9500, () => {
  console.log('跑起来了啊')
})
