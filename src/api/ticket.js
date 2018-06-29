import request from '@/utils/request'

export function getFilms () {
  return request({
    url: '/api/films',
    method: 'get'
  })
}

export function getCinemas (params) {
  return request({
    url: '/api/cinemas',
    method: 'get',
    params
  })
}

export function getTheaters (params) {
  return request({
    url: '/api/theaters',
    method: 'get',
    params
  })
}
