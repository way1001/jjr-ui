
 import request from '@/router/axios'

 export function getPage(query) {
     return request({
         url: '/mkt/popupads/page',
         method: 'get',
         params: query
     })
 }
 
 export function addObj(obj) {
     return request({
         url: '/mkt/popupads',
         method: 'post',
         data: obj
     })
 }
 
 export function getObj(id) {
     return request({
         url: '/mkt/popupads/' + id,
         method: 'get'
     })
 }
 
 export function delObj(id) {
     return request({
         url: '/mkt/popupads/' + id,
         method: 'delete'
     })
 }
 
 export function putObj(obj) {
     return request({
         url: '/mkt/popupads',
         method: 'put',
         data: obj
     })
 }
 
 export function getObj2() {
   return request({
     url: '/mkt/popupads',
     method: 'get'
   })
 }
 