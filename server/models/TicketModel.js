const request = require('../utils/request')
const cheerio = require('cheerio')
const vm = require('vm')

async function GetCity () {
  const result = await request({
    url: '/qryCitys.htm',
    method: 'post'
  })
  const $ = cheerio.load(result.data)
  const cityDataEleList = $('#all_city_ul li')
  const cityData = []
  cityDataEleList.each(function () {
    const cityDataEle = $(this).find('a')
    const breviary = $(this).find('strong').text()
    cityDataEle.each(function () {
      const cityId = $(this).attr('href').match(/[1-9]\d*/g).join('')
      const cityName = $(this).text()
      cityData.push({
        city_id: Number(cityId),
        city_name: cityName,
        breviary: breviary
      })
    })
  })
  return cityData
}

async function GetHotFilms () {
  const city = await request({
    url: '/xhgCity.htm',
    method: 'post',
    data: {cityid: 110100},
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      cookie: 'JSESSIONKEY=3c54416782734504b42e6bc8daa492ee; JSESSIONID=FACF2FB6BF4805DDA22CCDE2E752D6DE.tomcat2;'
    }
  })
  const result = await request({
    url: '/',
    method: 'get',
    headers: {cookie: 'JSESSIONKEY=3c54416782734504b42e6bc8daa492ee; JSESSIONID=FACF2FB6BF4805DDA22CCDE2E752D6DE.tomcat2;'}
  })
  const $ = cheerio.load(result.data)
  const filmListEle = $('head').find('script')
  const sandbox = {}
  vm.createContext(sandbox)
  vm.runInContext(filmListEle.html(), sandbox)
  return $.html()
}

async function GetCinemaByFilmsId (id) {
  const result = await request({
    url: '/qryCinemssByFilm.htm',
    method: 'post',
    data: {mid: id}
  })
  return result
}

async function GetTheatersByCinemaId (cinemaid, filmsid) {
  const result = await request({
    url: '/qryShows.htm',
    method: 'post',
    data: {
      mid: filmsid,
      cid: cinemaid
    }
  })
  return result
}

async function GetSeats (cinemaid, theatersid) {
  const result = await request({
    url: `/seat/${cinemaid}/${theatersid}`,
    method: 'get'
  })
  const $ = cheerio.load(result.data)
  const seats = $('.ch_seat')
  return seats
}

module.exports = {
  GetCity,
  GetSeats,
  GetHotFilms,
  GetCinemaByFilmsId,
  GetTheatersByCinemaId
}

// TXT_USER_CITY=440300;
// Hm_lvt_f3a470502268bd255498a2e6bd23f8d4=1529976777,1529991242;
// YXTID=4C53018B34D64FA3;
// JSESSIONKEY=1ed8493963594fa9924a497f32ce9f8d;
// JSESSIONID=CF8B4BEF35F1087DAD49AB91800FAEA1.tomcat1;
// Hm_lpvt_f3a470502268bd255498a2e6bd23f8d4=1530174391

// Set-Cookie: JSESSIONKEY=6e2ebc47e510435ab2d7b626e14d80cb; Path=/
// Set-Cookie: JSESSIONID=0092E9F8AB4CCCCC201EDD5B4EF539CF.tomcat2; Path=/; HttpOnly
