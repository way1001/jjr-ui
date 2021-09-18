/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
    dialogDrag: true,
    border: true,
    indexLabel: '序号',
    index: true,
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    menuType: 'text',
    searchShow: false,
    viewBtn: true,
    column: [
      {
        label: '户型名称',
        prop: 'name',
        rules: [{
          required: true,
          message: '户型名称不能为空',
          trigger: 'blur'
        }],
        span: 16,
      },
      {
        label: '销售状态',
        prop: 'salesStatus',
        type: 'select',
        rules: [{
          required: true,
          message: '请选择销售状态',
          trigger: 'blur'
        }],
        dicData: [{
          label: '在售',
          value: '0'
        }, {
          label: '即开',
          value: '1'
        }, {
          label: '售馨',
          value: '2'
        }]
      },
      {
        label: '户型图',
        prop: 'src',
        dataType: 'array',
        slot: true,
        formslot: true,
        minWidth: 150,
        span: 16,
      },
      {
        label: '售价',
        prop: 'price',
      },
      {
        label: '关键字',
        prop: 'keywords',
        span: 16,
      },
      {
        label: '户型类型',
        prop: 'type',
      },
      {
        label: '户型分类',
        prop: 'category',
        formslot: true,
      },
      {
        label: '建筑面积',
        prop: 'floorage',
      },
      {
        label: '朝向',
        prop: 'orientation',
      },
      {
        label: '排序字段',
        prop: 'sort',
        sortable: true
      },
      {
        label: '置顶',
        prop: 'isStick',
        sortable: true,
        slot: true,
        type: 'radio',
        dicData: [{
          label: '不置顶',
          value: '0'
        }, {
          label: '置顶',
          value: '1'
        }]
      },
    ]
}
