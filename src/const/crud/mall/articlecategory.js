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
      label: '分类名',
      prop: 'name',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入分类名',
          trigger: 'blur'
        },
        {
          max: 100,
          message: '长度在不能超过100个字符'
        },
      ]
    },
    {
      label: '排序',
      prop: 'sort',
      sortable: true,
      rules: [{
        required: true,
        message: '排序不能为空',
        trigger: 'blur'
      }]
    },
    {
      label: '是否显示',
      prop: 'enable',
      type: 'radio',
      search: true,
      sortable: true,
      span: 24,
      slot: true,
      rules: [{
        required: true,
        message: '请选择显示状态',
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
  ]
}
