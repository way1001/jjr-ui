/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.aiforest.net
 * 注意：
 * 本软件为www.aiforest.net开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
import {getList} from '@/api/wxmp/wxapp'

const validateAppID = (rule, value, callback) => {
  if (window.openType === 'edit'){
    callback()
  }else{
    getList({
      id: value
    }).then(response => {
      let data = response.data
      if (data.length > 0) {
        callback(new Error('AppId已经存在'))
      } else {
        callback()
      }
    })
  }
}

const validateWeixinSign = (rule, value, callback) => {
  if (window.openType === 'edit'){
    callback()
  }else{
    getList({
      weixinSign: value
    }).then(response => {
      let data = response.data
      if (data.length > 0) {
        callback(new Error('weixinSign已经存在'))
      } else {
        callback()
      }
    })
  }
}

export const tableOption = {
  dialogType: 'drawer',
  dialogWidth: '80%',
  border: true,
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuWidth: 200,
  menuType: 'text',
  searchShow: false,
  excelBtn: true,
  printBtn: true,
  viewBtn: true,
  expand: true,
  defaultExpandAll: true,
  labelWidth: 120,
  searchMenuSpan: 6,
  column: [
    {
      label: '所属机构',
      prop: 'organId',
      hide: true,
      sortable:true,
      rules: [{
        required: true,
        message: '请选择机构',
        trigger: 'change'
      }],
      type: 'tree',
      search: true,
      props: {
        label: 'name',
        value: 'id'
      },
      defaultExpandAll: true,
      dicUrl: '/upms/organ/tree'
    },
    {
      label: '公众号名称',
      prop: 'name',
      align:'left',
      search:true,
      width: 260,
      slot:true,
      rules: [{
        required: true,
        message: "请输入微信号名称",
        trigger: "blur"
      }]
    },
    {
      label: '公众号类型',
      prop: 'weixinType',
      type: 'select',
      align:'left',
      dicUrl: '/upms/dict/type/weixin_type',
      sortable: true,
      search: true,
      slot: true,
      width: 170,
      rules: [{
        required: true,
        message: "请选择公众号类型",
        trigger: "blur"
      }]
    },
    {
      label: '认证类型',
      prop: 'verifyType',
      type: 'select',
      align:'left',
      dicUrl: '/upms/dict/type/wx_verify_type',
      sortable:true,
      search:true,
      slot:true,
      rules: [{
        required: true,
        message: "请选择认证类型",
        trigger: "blur"
      }]
    },
    {
      label: '微信原始ID',
      prop: 'weixinSign',
      search:true,
      hide:true,
      editDisabled: true,
      rules: [{
        required: true,
        message: "请输入微信原始ID",
        trigger: "blur"
      },{
        validator: validateWeixinSign,
        trigger: 'blur'
      }],
      tip: '在微信公众平台（mp.weixin.qq.com）的菜单【设置】-【公众号设置】-【帐号详情】中能找到原始ID'
    },
	  {
      label: 'AppID',
      prop: 'id',
      search:true,
      hide:true,
      editDisabled: true,
      rules: [{
        required: true,
        message: "请输入AppID",
        trigger: "blur"
      },{
        validator: validateAppID,
        trigger: 'blur'
      }],
      tip: '在微信公众平台（mp.weixin.qq.com）的菜单【开发】-【基本配置】中能找到AppID'
    },
    {
      label: 'AppSecret',
      prop: 'secret',
      type:'password',
      rules: [{
        required: true,
        message: "请输入AppSecret",
        trigger: "blur"
      }],
      hide: true,
      tip: '在微信公众平台（mp.weixin.qq.com）的菜单【开发】-【基本配置】中能找到AppSecret'
    },
	  {
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      sortable:true,
      hide:true,
      editDisplay:false,
      addDisplay:false
    },
	  {
      label: '更新时间',
      prop: 'updateTime',
      type: 'datetime',
      sortable:true,
      hide:true,
      editDisplay:false,
      addDisplay:false
    },
    {
      label: 'token',
      prop: 'token',
      hide:true
    },
    {
      label: 'EnAESKey',
      prop: 'aesKey',
      hide:true
    },
    {
      label: '主体名称',
      prop: 'principalName',
      hide:true
    },
	  {
      label: '微社区URL',
      prop: 'community',
      hide:true
    },
	  {
      label: '备注信息',
      prop: 'remarks',
      hide:true
    },
  ]
}
