const Router = require('koa-router')
const TicketModel = require('../models/TicketModel')
const CityController = require('../controller/City')
const BuyTicketController = require('../controller/BuyTicket')

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = await TicketModel.GetHotFilms(ctx.session.city)
  next()
})

router
  .get('/cinemas', BuyTicketController.getCinemaByFilmsId)
  .get('/films', BuyTicketController.getHotFilms)
  .get('/theaters', BuyTicketController.GetTheatersByCinemaId)
  .get('/city', CityController.getCityList)
  .post('/city', CityController.changeCity)

module.exports = router
