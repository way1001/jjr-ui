/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.aiforest.net
 * 注意：
 * 本软件为www.aiforest.net开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
import request from '@/router/axios'

export function getPage(query) {
  return request({
    url: '/weixin/wxapp/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/weixin/wxapp',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/weixin/wxapp/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/weixin/wxapp/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/weixin/wxapp',
    method: 'put',
    data: obj
  })
}

export function getList(query) {
  return request({
    url: '/weixin/wxapp/list',
    method: 'get',
    params: query
  })
}

export function createQrCode(obj) {
  return request({
    url: '/weixin/wxapp/qrCode',
    method: 'post',
    data: obj
  })
}

export function clearQuota(obj) {
  return request({
    url: '/weixin/wxapp/quota',
    method: 'put',
    data: obj
  })
}

export function getAccessToken(query) {
  return request({
    url: '/weixin/wxapp/access-token',
    method: 'get',
    params: query
  })
}

export function getAuthorizerInfo(id) {
  return request({
    url: '/weixin/open/api/authorizer-info/' + id,
    method: 'get'
  })
}

export function getQrCode(query) {
  return request({
    url: '/weixin/wxapp/qrCode',
    method: 'get',
    params: query
  })
}