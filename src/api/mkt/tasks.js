import request from '@/router/axios'
export const tasksService = {
  list: function(params) {
    return request({
      url: '/mkt/engine-rest/task',
      method: 'get',
      params
    })
  },
  count: function(params) {
    return request({
      url: '/mkt/engine-rest/task/count',
      method: 'get',
      params
    })
  },
  complete: function(id, params) {
    return request.post('/mkt/engine-rest/task/' + id + '/complete', params)
  },
  endtask: function(instanceId, varname, params) {
    return request.put('/mkt/engine-rest/process-instance/' + instanceId + '/variables/' + varname, params)
  }
}

