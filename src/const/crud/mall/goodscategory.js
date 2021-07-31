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
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  searchShow: false,
  viewBtn: true,
  searchMenuSpan: 6,
  column: [
	  {
      label: '父分类',
      prop: 'parentId',
      type: 'tree',
      hide: true,
      props: {
        label: 'name',
        value: 'id'
      },
      rules: [{
        required: true,
        message: '请选择父分类',
        trigger: 'change'
      }]
    },
	  {
      label: '名称',
      prop: 'name',
      align: 'left',
      rules: [{
        required: true,
        message: '请输入名称',
        trigger: 'blur'
      },{
        max: 16,
        message: '长度在不能超过16个字符'
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
    {
      label: '排序',
      type: 'number',
      prop: 'sort',
      rules: [{
        required: true,
        message: '排序不能为空',
        trigger: 'blur'
      }]
    },
    {
      label: '图片',
      prop: 'picUrl',
      width: 250,
      dataType: 'array',
      slot: true,
      formslot: true,
      rules: [{
        type: 'array',
        required: true,
        message: '图片不能为空',
        trigger: 'change'
      }]
    },
    {
      label: '描述',
      prop: 'description',
      hide: true,
      rules: [{
        max: 255,
        message: '长度在不能超过255个字符'
      }]
    },
	  {
      label: '创建时间',
      prop: 'createTime',
      editDisplay:false,
      addDisplay:false
    },
	  {
      label: '更新时间',
      prop: 'updateTime',
      editDisplay:false,
      addDisplay:false
    },
  ]
}
