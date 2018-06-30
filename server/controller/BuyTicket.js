const request = require('../utils/request')
const cheerio = require('cheerio')
const vm = require('vm')

const getHotFilms = async (ctx, next) => {
  const result = await request({
    url: '/',
    method: 'get',
    headers: { cookie: ctx.session.city }
  })
  const $ = cheerio.load(result.data)
  const filmListEle = $('head').find('script')
  const sandbox = {}
  vm.createContext(sandbox)
  vm.runInContext(filmListEle.html(), sandbox)
  ctx.body.data = sandbox.hotFilms
  next()
}

const getCinemaByFilmsId = async (ctx, next) => {
  const result = await request({
    url: '/qryCinemssByFilm.htm',
    method: 'post',
    headers: { cookie: ctx.session.city },
    params: { mid: ctx.query.mid }
  })
  ctx.body.data = result.data
  next()
}

const GetTheatersByCinemaId = async (ctx, next) => {
  const result = await request({
    url: '/qryShows.htm',
    method: 'post',
    headers: { cookie: ctx.session.city },
    params: {
      mid: ctx.query.mid,
      cid: ctx.query.cinemaid,
      d: ctx.query.date
    }
  })
  ctx.body.data = result.data
  next()
}

module.exports = {
  getHotFilms,
  getCinemaByFilmsId,
  GetTheatersByCinemaId
}
