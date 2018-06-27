const Router = require('koa-router')
const TicketModel = require('../models/TicketModel')
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = await TicketModel.GetHotFilms()
  next()
})

router.get('/city', async (ctx, next) => {
  const result = await TicketModel.GetCity()
  ctx.body = result
  next()
})

module.exports = router
