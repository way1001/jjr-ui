/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.aiforest.net
 * 注意：
 * 本软件为www.aiforest.net开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
  dialogDrag: true,
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  searchShow: false,
  excelBtn: true,
  printBtn: true,
  viewBtn: true,
  searchMenuSpan: 6,
  column: [
    {
      label: '会场日期',
      prop: 'hallDate',
      type: "date",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      search: true,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入会场日期',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '会场时间',
      prop: 'hallTime',
      type: 'select',
      sortable: true,
      dicData: [{
        label: '00:00',
        value: '0'
      }, {
        label: '01:00',
        value: '1'
      }, {
        label: '02:00',
        value: '2'
      }, {
        label: '03:00',
        value: '3'
      }, {
        label: '04:00',
        value: '4'
      }, {
        label: '05:00',
        value: '5'
      }, {
        label: '06:00',
        value: '6'
      }, {
        label: '07:00',
        value: '7'
      }, {
        label: '08:00',
        value: '8'
      }, {
        label: '09:00',
        value: '9'
      }, {
        label: '10:00',
        value: '10'
      }, {
        label: '11:00',
        value: '11'
      }, {
        label: '12:00',
        value: '12'
      }, {
        label: '13:00',
        value: '13'
      }, {
        label: '14:00',
        value: '14'
      }, {
        label: '15:00',
        value: '15'
      }, {
        label: '16:00',
        value: '16'
      }, {
        label: '17:00',
        value: '17'
      }, {
        label: '18:00',
        value: '18'
      }, {
        label: '19:00',
        value: '19'
      }, {
        label: '20:00',
        value: '20'
      }, {
        label: '21:00',
        value: '21'
      }, {
        label: '22:00',
        value: '22'
      }, {
        label: '23:00',
        value: '23'
      }],
      rules: [
        {
          required: true,
          message: '请选择会场时间',
          trigger: 'blur'
        }
      ]
    },{
      label: '是否启用',
      prop: 'enable',
      type: 'radio',
      search: true,
      sortable: true,
      slot: true,
      rules: [{
        required: true,
        message: '请选择启用状态',
        trigger: 'blur'
      }],
      dicData: [{
        label: '关闭',
        value: '0'
      }, {
        label: '启用',
        value: '1'
      }]
    },
    {
      label: '秒杀商品',
      prop: 'listSeckillInfo',
      formslot: true,
      hide: true,
      span: 24
    }
  ]
}
