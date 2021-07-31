import request from '@/router/axios'

export const processService = {
  start: function(params) {
    return request.post('/mkt/engine-rest/process-definition/' + params.processDefinitionId + '/start', params)
  }
}

