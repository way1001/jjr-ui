// import request from '@/utils/flowRequest'
import request from '@/router/axios'

export const definitionsService = {
  list: function(params) {
    if (!params) {
      params = {}
      params.name = ''
    }
    return request({
      url: '/mkt/engine-rest/process-definition',
      method: 'get',
      params
    })
  },
  count: function(params) {
    return request({
      url: '/mkt/engine-rest/process-definition/count',
      method: 'get',
      params
    })
  },
  getBPMNXML: function(id) {
    return request({
      url: '/mkt/engine-rest/process-definition/' + id + '/xml',
      method: 'get'
    })
  }

}

