/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.aiforest.net
 * 注意：
 * 本软件为www.aiforest.net开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
  dialogDrag:true,
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  selection: true,
  menuAlign: 'center',
  align: 'center',
  editBtn: false,
  delBtn: false,
  addBtn: false,
  excelBtn: true,
  printBtn: true,
  viewBtn: true,
  searchShow: false,
  menuWidth: 150,
  menuType:'text',
  searchMenuSpan: 6,
  defaultSort:{
    prop: 'subscribeTime',
    order: 'descending'
  },
  column: [
    {
      label: '头像',
      prop: 'headimgUrl',
      imgWidth:50,
      dataType: 'string',
      type: 'upload',
      listType: 'picture-img',
      editDisplay:false
    },
    {
      label: '昵称',
      prop: 'nickName',
      width:100,
      sortable:true,
      search:true,
      editDisplay:false
    },
    {
      label: '是否订阅',
      prop: 'subscribe',
      width:80,
      type: 'select',
      sortable:true,
      search:true,
      editDisplay:false,
      slot:true,
      dicUrl: '/upms/dict/type/wx_subscribe'
    },
    {
      label: 'openId',
      prop: 'openId',
      search:true
    },
    {
      label: 'union_id',
      prop: 'unionId',
      search:true
    },
    {
      label: '关注渠道',
      prop: 'subscribeScene',
      type: 'select',
      sortable:true,
      search:true,
      editDisplay:false,
      dicUrl: '/upms/dict/type/wx_subscribe_scene'
    },
    {
      label: '关注时间',
      prop: 'subscribeTime',
      type: 'datetime',
      width:95,
      sortable:true,
      editDisplay:false
    },
    {
      label: '性别',
      prop: 'sex',
      width: 60,
      type: 'select',
      sortable:true,
      search:true,
      editDisplay:false,
      slot:true,
      dicUrl: '/upms/dict/type/wx_sex'
    },
    {
      label: '国家',
      prop: 'country',
      sortable:true,
      search:true,
      editDisplay:false,
      width: 60
    },
    {
      label: '省份',
      prop: 'province',
      sortable:true,
      editDisplay:false,
      width: 60
    },
    {
      label: '城市',
      prop: 'city',
      sortable: true,
      search: true,
      editDisplay: false,
      width: 60
    },
    {
      label: '语言',
      prop: 'language',
      sortable:true,
      editDisplay:false,
      width: 60
    },
    {
      label: '标签',
      prop: 'tagidList',
      type: 'select',
      editDisplay: false,
      searchslot:true,
      search:true,
      props: {
        label: 'name',
        value: 'id'
      }
    },
    {
      label: '备注',
      prop: 'remark'
    },
    {
      label: '二维码扫码场景',
      prop: 'qrSceneStr',
      type: 'select',
      dicUrl: '/upms/dict/type/wx_qr_scene_str',
      sortable: true,
      search: true,
      editDisplay: false
    },
    {
      label: '关注次数',
      prop: 'subscribeNum',
      width:50,
      sortable:true,
      editDisplay:false
    },
    {
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      sortable:true,
      hide:true,
      editDisplay:false
    },
    {
      label: '更新时间',
      prop: 'updateTime',
      type: 'datetime',
      sortable:true,
      hide:true,
      editDisplay:false
    },
    {
      label: '取关时间',
      prop: 'cancelSubscribeTime',
      type: 'datetime',
      sortable:true,
      hide:true,
      editDisplay:false
    },
    {
      label: '最近定位',
      prop: 'latitude',
      slot: true,
      editDisplay: false,
      viewDisplay: false,
      width: 60
    }
  ]
}

export const tableOption2 = {
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  selection: true,
  menuAlign: 'center',
  align: 'center',
  editBtn: false,
  delBtn: false,
  addBtn: false,
  excelBtn: false,
  printBtn: false,
  viewBtn: false,
  searchShow: true,
  menu: false,
  menuWidth: 150,
  menuType:'text',
  searchMenuSpan: 6,
  defaultSort:{
    prop: 'subscribeTime',
    order: 'descending'
  },
  column: [
    {
      label: '头像',
      prop: 'headimgUrl',
      type:'upload',
      imgWidth:50,
      listType:'picture-img',
      editDisplay:false
    },
    {
      label: '昵称',
      prop: 'nickName',
      width:100,
      sortable:true,
      search:true,
      editDisplay:false
    },
    {
      label: '关注渠道',
      prop: 'subscribeScene',
      type: 'select',
      sortable:true,
      search:true,
      editDisplay:false,
      dicUrl: '/upms/dict/type/wx_subscribe_scene'
    },
    {
      label: '关注时间',
      prop: 'subscribeTime',
      type: 'datetime',
      width:95,
      sortable:true,
      editDisplay:false
    },
    {
      label: '性别',
      prop: 'sex',
      width: 60,
      type: 'select',
      sortable:true,
      search:true,
      editDisplay:false,
      slot:true,
      dicUrl: '/upms/dict/type/wx_sex'
    },
    {
      label: '国家',
      prop: 'country',
      sortable:true,
      search:true,
      editDisplay:false
    },
    {
      label: '省份',
      prop: 'province',
      sortable:true,
      editDisplay:false
    },
    {
      label: '城市',
      prop: 'city',
      sortable:true,
      search:true,
      editDisplay:false
    },
    {
      label: '语言',
      prop: 'language',
      sortable:true,
      search:true,
      editDisplay:false
    },
    {
      label: '二维码扫码场景',
      prop: 'qrSceneStr',
      type: 'select',
      dicUrl: '/upms/dict/type/wx_qr_scene_str',
      sortable:true,
      search:true,
      editDisplay:false
    },
    {
      label: '用户标识',
      prop: 'openId',
      hide:true,
      editDisplay:false
    },
    {
      label: 'union_id',
      prop: 'unionId',
      hide:true,
      editDisplay:false
    },
    {
      label: '关注次数',
      prop: 'subscribeNum',
      width:50,
      sortable:true,
      editDisplay:false
    }
  ]
}
