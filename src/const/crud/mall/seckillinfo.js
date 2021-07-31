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
      label: '商品',
      prop: 'spuId',
      type: 'select',
      filterable: true,
      editDisabled: true,
      props: {
        label: 'name',
        value: 'id'
      },
      cascaderItem: ['skuId'],
      dicUrl: '/mall/goodsspu/list',
      rules: [
        {
          required: true,
          message: '请选择商品',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '商品规格',
      prop: 'skuId',
      type: 'select',
      filterable: true,
      editDisabled: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: `/mall/goodssku/list/{{key}}`,
      rules: [
        {
          required: true,
          message: '请选择商品规格',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '创建时间',
      prop: 'createTime',
      sortable: true,
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '图片',
      prop: 'picUrl',
      width: 250,
      dataType: 'array',
      slot: true,
      formslot: true,
      span: 24,
      rules: [{
        type: 'array',
        required: true,
        message: '图片不能为空',
        trigger: 'change'
      }]
    },
    {
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
      label: '秒杀名称',
      prop: 'name',
      sortable: true,
      rules: [
        {
          max: 100,
          message: '长度在不能超过100个字符'
        },
      ]
    },
    {
      label: '秒杀底价',
      prop: 'seckillPrice',
      type: 'number',
      minRows: 0,
      precision: 2,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入秒杀底价',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '已售数量',
      prop: 'seckillNum',
      type: 'number',
      minRows: 0,
      precision: 0,
      sortable: true,
      rules: []
    },
    {
      label: '总限量',
      prop: 'limitNum',
      type: 'number',
      minRows: 0,
      precision: 0,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入库存',
          trigger: 'blur'
        }
      ],
      tip: '总限量需小于主商品库存'
    },
    {
      label: '每人限购数量',
      prop: 'eachLimitNum',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入每人限购数量',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '分享标题 ',
      prop: 'shareTitle',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入分享标题',
          trigger: 'blur'
        },
        {
          max: 30,
          message: '长度在不能超过30个字符'
        },
      ]
    },
    {
      label: '秒杀规则',
      prop: 'seckillRule',
      type: 'textarea',
      hide: true,
      rules: [{
        required: true,
        message: '请输入秒杀规则',
        trigger: 'blur'
      }],
    }
  ]
}

export const tableOption2 = {
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
  selection: true,
  menu: false,
  searchMenuSpan: 6,
  column: [
    {
      label: '商品',
      prop: 'spuId',
      type: 'select',
      filterable: true,
      editDisabled: true,
      props: {
        label: 'name',
        value: 'id'
      },
      cascaderItem: ['skuId'],
      dicUrl: '/mall/goodsspu/list',
      rules: [
        {
          required: true,
          message: '请选择商品',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '商品规格',
      prop: 'skuId',
      type: 'select',
      filterable: true,
      editDisabled: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: `/mall/goodssku/list/{{key}}`,
      rules: [
        {
          required: true,
          message: '请选择商品规格',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '创建时间',
      prop: 'createTime',
      sortable: true,
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '图片',
      prop: 'picUrl',
      width: 250,
      dataType: 'array',
      slot: true,
      formslot: true,
      span: 24,
      rules: [{
        type: 'array',
        required: true,
        message: '图片不能为空',
        trigger: 'change'
      }]
    },
    {
      label: '是否启用',
      prop: 'enable',
      type: 'radio',
      search: true,
      sortable: true,
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
      label: '秒杀名称',
      prop: 'name',
      sortable: true,
      rules: [
        {
          max: 100,
          message: '长度在不能超过100个字符'
        },
      ]
    },
    {
      label: '秒杀底价',
      prop: 'seckillPrice',
      type: 'number',
      minRows: 0,
      precision: 2,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入秒杀底价',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '已售数量',
      prop: 'seckillNum',
      type: 'number',
      minRows: 0,
      precision: 0,
      sortable: true,
      rules: []
    },
    {
      label: '总限量',
      prop: 'limitNum',
      type: 'number',
      minRows: 0,
      precision: 0,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入库存',
          trigger: 'blur'
        }
      ],
      tip: '总限量需小于主商品库存'
    },
    {
      label: '每人限购数量',
      prop: 'eachLimitNum',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入每人限购数量',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '分享标题 ',
      prop: 'shareTitle',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入分享标题',
          trigger: 'blur'
        },
        {
          max: 30,
          message: '长度在不能超过30个字符'
        },
      ]
    },
    {
      label: '秒杀规则',
      prop: 'seckillRule',
      type: 'textarea',
      hide: true,
      rules: [{
        required: true,
        message: '请输入秒杀规则',
        trigger: 'blur'
      }],
    }
  ]
}
