/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
    // dialogDrag: true,
    dialogType: 'drawer',
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
        label: '标题',
        prop: 'title',
        span: 24,
        rules: [{
          required: true,
          message: '标题不能为空',
          trigger: 'blur'
        }]
      },
      {
        label: '分类',
        prop: 'category',
        type: 'select',
        rules: [{
          required: true,
          message: '请选新闻动态分类',
          trigger: 'blur'
        }],
        dicData: [{
          label: '最新优惠',
          value: '1'
        }, {
          label: '楼盘活动',
          value: '2'
        }, {
          label: '工程进度',
          value: '3'
        }, {
          label: '置业导购',
          value: '4'
        }]
      },
      {
        label: '排序字段',
        prop: 'sort',
        sortable: true
      },
      {
        label: '状态',
        prop: 'delFlag',
        type: 'radio',
        slot: true,
        span: 24,
        rules: [{
          required: true,
          message: '请选择是否启用',
          trigger: 'blur'
        }],
        dicData: [{
          label: '显示',
          value: '0'
        }, {
          label: '隐藏',
          value: '1'
        }]
      },
      {
        label: '封面',
        prop: 'thumbnail',
        dataType: 'array',
        slot: true,
        formslot: true
      },
      {
        label: '是否显示在平台',
        prop: 'affiliation',
        type: 'radio',
        span: 16,
        rules: [{
          required: true,
          message: '请选择',
          trigger: 'blur'
        }],
        dicData: [{
          label: '不显示',
          value: '2'
        }, {
          label: '显示',
          value: '3'
        }]
      },
    {
      label: '是否自定义',
      prop: 'type',
      type: 'radio',
      span: 16,
      rules: [{
        required: true,
        message: '请选择',
        trigger: 'blur'
      }],
      dicData: [{
        label: '自定义动态',
        value: '0'
      }, {
        label: '公众号文章链接',
        value: '1'
      }]
    },
    {
      label: '公众号文章链接',
      prop: 'articleLink',
      span: 24,
    },
      {
        label: '动态详情',
        prop: 'details',
        span: 16,
        slot: true,
        formslot: true,
      },

    ]
}
