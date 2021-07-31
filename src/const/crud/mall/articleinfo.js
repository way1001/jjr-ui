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
  labelWidth: 100,
  column: [
    {
      label: '创建时间',
      prop: 'createTime',
      sortable: true,
      display: false,
    },
    {
      label: '最后更新时间',
      prop: 'updateTime',
      sortable: true,
      display: false,
    },
    {
      label: '是否显示',
      prop: 'enable',
      type: 'radio',
      display: false,
      search: true,
      sortable: true,
      slot: true,
      dicData: [{
        label: '关闭',
        value: '0'
      }, {
        label: '启用',
        value: '1'
      }]
    },
    {
      label: '文章图片',
      prop: 'picUrl',
      sortable: true,
      display: false,
      width: 120,
      slot: true,
    },
    {
      label: '文章分类',
      prop: 'categoryId',
      type: 'select',
      sortable: true,
      display: false,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/articlecategory/list'
    },
    {
      label: '作者',
      prop: 'authorName',
      sortable: true,
      display: false,
    },
    {
      label: '文章标题',
      prop: 'articleTitle',
      sortable: true,
      display: false,
    },
    {
      label: '文章简介',
      prop: 'articleIntroduction',
      sortable: true,
      display: false,
    },
    {
      label: '原文地址',
      prop: 'originalUrl',
      sortable: true,
      display: false,
    },
    {
      label: 'banner显示',
      prop: 'isBanner',
      sortable: true,
      display: false,
      dicData: [{
        label: '否',
        value: '0'
      }, {
        label: '是',
        value: '1'
      }]
    },
    {
      label: '热门文章',
      prop: 'isHot',
      sortable: true,
      display: false,
      dicData: [{
        label: '否',
        value: '0'
      }, {
        label: '是',
        value: '1'
      }]
    },
  ],
  group: [
    {
      icon: 'el-icon-collection-tag',
      label: '基本信息',
      prop: 'group1',
      column: [
        {
          label: '是否显示',
          prop: 'enable',
          type: 'radio',
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
          label: '文章图片',
          prop: 'picUrl',
          dataType: 'array',
          formslot: true,
          span: 24,
          rules: [
            {
              required: true,
              message: '请上传文章图片',
              trigger: 'blur'
            }
          ]
        },
        {
          label: '文章分类',
          prop: 'categoryId',
          type: 'select',
          rules: [
            {
              required: true,
              message: '请选择文章分类',
              trigger: 'blur'
            }
          ],
          props: {
            label: 'name',
            value: 'id'
          },
          dicUrl: '/mall/articlecategory/list'
        },
        {
          label: '作者',
          prop: 'authorName',
          rules: [
            {
              required: true,
              message: '请输入作者',
              trigger: 'blur'
            },
            {
              max: 64,
              message: '长度在不能超过64个字符'
            },
          ]
        },
        {
          label: '文章标题',
          prop: 'articleTitle',
          rules: [
            {
              required: true,
              message: '请输入文章标题',
              trigger: 'blur'
            },
            {
              max: 100,
              message: '长度在不能超过100个字符'
            },
          ]
        },
        {
          label: '文章简介',
          prop: 'articleIntroduction',
          rules: [
            {
              required: true,
              message: '请输入文章简介',
              trigger: 'blur'
            },
            {
              max: 500,
              message: '长度在不能超过500个字符'
            },
          ]
        },
        {
          label: '原文地址',
          prop: 'originalUrl',
          rules: [
            {
              max: 1024,
              message: '长度在不能超过1024个字符'
            },
          ]
        },
      ]
    },
    {
      icon: 'el-icon-mobile-phone',
      label: '文章内容',
      prop: 'group2',
      column: [
        {
          label: '文章内容',
          prop: 'articleContent',
          formslot: true,
          span: 12
        }
      ]
    },
    {
      icon: 'el-icon-files',
      label: '其他信息',
      prop: 'group3',
      column: [
        {
          label: 'banner显示',
          prop: 'isBanner',
          type: 'radio',
          dicData: [{
            label: '否',
            value: '0'
          }, {
            label: '是',
            value: '1'
          }],
          rules: [
            {
              required: true,
              message: '请输入是否banner显示（1：是；0：否）',
              trigger: 'blur'
            },
            {
              max: 2,
              message: '长度在不能超过2个字符'
            },
          ]
        },
        {
          label: '热门文章',
          prop: 'isHot',
          type: 'radio',
          dicData: [{
            label: '否',
            value: '0'
          }, {
            label: '是',
            value: '1'
          }],
          rules: [
            {
              required: true,
              message: '请输入是否热门文章（1：是；0：否）',
              trigger: 'blur'
            },
            {
              max: 2,
              message: '长度在不能超过2个字符'
            },
          ]
        }
      ]
    }
  ]
}
