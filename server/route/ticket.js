const Router = require('koa-router')
const TicketModel = require('../models/TicketModel')
const CityController = require('../controller/city')
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = await TicketModel.GetHotFilms()
  next()
})

router
  .get('/city', CityController.getCityList)
  .post('/city', CityController.changeCity)

module.exports = router
