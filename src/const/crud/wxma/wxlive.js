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
  excelBtn: true,
  printBtn: true,
  viewBtn: true,
  searchShow: false,
  menuWidth: 150,
  labelWidth: 120,
  menuType:'text',
  searchMenuSpan: 6,
  column: [
    {
      label: '直播间ID',
      prop: 'roomId',
      display:false,
    },
    {
      label: '直播间背景图',
      prop: 'coverImg',
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }],
      slot: true,
      formslot: true
    },
    {
      label: '直播间分享图',
      prop: 'shareImg',
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }],
      slot: true,
      formslot: true
    },
    {
      label: '直播频道封面图',
      prop: 'feedsImg',
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }],
      hide: true,
      editDisplay: false,
      slot: true,
      formslot: true
    },
    {
      label: '直播间名称',
      prop: 'name',
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '直播间状态',
      prop: 'liveStatus',
      width: 60,
      type: 'select',
      display: false,
      dicData: [{
        label: '直播中',
        value: 101
      },{
        label: '未开始',
        value: 102
      },{
        label: '已结束',
        value: 103
      },{
        label: '禁播',
        value: 104
      },{
        label: '暂停',
        value: 105
      },{
        label: '异常',
        value: 106
      },{
        label: '过期',
        value: 107
      }]
    },
    {
      label: '直播类型',
      prop: 'type',
      width: 60,
      type: 'radio',
      span: 24,
      editDisabled: true,
      dicData: [{
        label: '推流',
        value: 1
      },{
        label: '手机直播',
        value: 0
      }],
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '开始时间',
      prop: 'startTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }],
      tip: '开播时间需要在当前时间的10分钟后 并且 开始时间不能在 6 个月后'
    },
    {
      label: '结束时间',
      prop: 'endTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }],
      tip: '开播时间和结束时间间隔不得短于30分钟，不得超过12小时'
    },
    {
      label: '是否关闭点赞',
      prop: 'closeLike',
      type: 'radio',
      width: 60,
      dicData: [{
        label: '关闭',
        value: 1
      },{
        label: '开启',
        value: 0
      }],
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '是否关闭货架',
      prop: 'closeGoods',
      type: 'radio',
      width: 60,
      dicData: [{
        label: '关闭',
        value: 1
      },{
        label: '开启',
        value: 0
      }],
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '是否关闭评论',
      prop: 'closeComment',
      type: 'radio',
      width: 60,
      dicData: [{
        label: '关闭',
        value: 1
      },{
        label: '开启',
        value: 0
      }],
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '主播名',
      prop: 'anchorName',
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }]
    },
    {
      label: '主播微信号',
      prop: 'anchorWechat',
      hide: true,
      rules: [{
        required: true,
        message: "必填项",
        trigger: "blur"
      }],
      tip: '每个直播间需要绑定一个用作核实主播身份，不会展示给观众。'
    },
  ]
}

export const tableOptionGoods = {
  dialogDrag: true,
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuWidth: 150,
  labelWidth: 120,
  menuType: 'text',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  refreshBtn: false,
  column: [
    {
      label: '商品ID',
      prop: 'goodsId'
    },
    {
      label: '商品详情页',
      prop: 'url',
    },
    {
      label: '商品图片',
      prop: 'coverImg',
      slot: true
    },
    {
      label: '商品名称',
      prop: 'name'
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
      precision: 2
    },
    {
      label: '价格2',
      prop: 'price2',
      display: false,
      type: 'number',
      hide: true,
      minRows: 0,
      precision: 2
    }
  ]
}
