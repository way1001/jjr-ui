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
  menuAlign: 'center',
  align: 'center',
  viewBtn: true,
  searchShow: false,
  menuWidth: 150,
  labelWidth: 120,
  menuType:'text',
  searchMenuSpan: 6,
  column: [
    {
      label: '商品ID',
      prop: 'goodsId',
      display: false,
    },
    {
      label: '商品详情页',
      prop: 'url',
      editDisabled: false,
      editDisplay: false,
      viewDisplay: false,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '商品图片',
      prop: 'coverImgUrl',
      editDisplay: false,
      viewDisplay: false,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }],
      slot: true,
      formslot: true
    },
    {
      label: '商品名称',
      prop: 'name',
      editDisabled: true,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      },{
        max: 14,
        message: '长度在不能超过14个汉字'
      }]
    },
    {
      label: '价格类型',
      prop: 'priceType',
      width: 60,
      type: 'select',
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }],
      dicData: [{
        label: '一口价',
        value: 1
      },{
        label: '价格区间',
        value: 2
      },{
        label: '折扣价',
        value: 3
      }]
    },
    {
      label: '价格',
      prop: 'price',
      display: false,
      type: 'number',
      slot: true,
      minRows: 0,
      precision: 2,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '价格2',
      prop: 'price2',
      display: false,
      type: 'number',
      hide: true,
      minRows: 0,
      precision: 2,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '添加平台',
      prop: 'thirdPartyTag',
      width: 60,
      type: 'select',
      display: false,
      dicData: [{
        label: 'API添加',
        value: '1'
      },{
        label: 'API添加',
        value: '2'
      },{
        label: '直播控制台添加',
        value: '0'
      }]
    },
  ]
}

export const tableOption2 = {
  dialogDrag:true,
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  searchShow: false,
  menuWidth: 150,
  labelWidth: 120,
  menu: false,
  menuType:'text',
  searchMenuSpan: 6,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  refreshBtn: false,
  selection: true,
  column: [
    {
      label: '商品ID',
      prop: 'goodsId',
      display: false,
    },
    {
      label: '商品详情页',
      prop: 'url',
      editDisabled: false,
      editDisplay: false,
      viewDisplay: false,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '商品图片',
      prop: 'coverImgUrl',
      editDisplay: false,
      viewDisplay: false,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }],
      slot: true,
    },
    {
      label: '商品名称',
      prop: 'name',
      editDisabled: true,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      },{
        max: 28,
        message: '长度在不能超过14个汉字'
      }]
    },
    {
      label: '价格类型',
      prop: 'priceType',
      width: 60,
      type: 'select',
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }],
      dicData: [{
        label: '一口价',
        value: 1
      },{
        label: '价格区间',
        value: 2
      },{
        label: '折扣价',
        value: 3
      }]
    },
    {
      label: '价格',
      prop: 'price',
      display: false,
      type: 'number',
      slot: true,
      minRows: 0,
      precision: 2,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '价格2',
      prop: 'price2',
      display: false,
      type: 'number',
      hide: true,
      minRows: 0,
      precision: 2,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '添加平台',
      prop: 'thirdPartyTag',
      width: 60,
      type: 'select',
      display: false,
      dicData: [{
        label: 'API添加',
        value: '1'
      },{
        label: 'API添加',
        value: '2'
      },{
        label: '直播控制台添加',
        value: '0'
      }]
    },
  ]
}
