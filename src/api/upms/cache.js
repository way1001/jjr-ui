import request from '@/router/axios'

export function getCache(query) {
  return request({
    url: '/upms/cache',
    method: 'get'
  })
}
