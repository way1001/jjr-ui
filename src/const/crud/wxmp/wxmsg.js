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
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType:'text',
  editBtn: false,
  delBtn: false,
  addBtn: false,
  viewBtn: false,
  searchBtn: true,
  excelBtn: true,
  printBtn: true,
  searchMenuSpan: 6,
  defaultSort:{
    prop:'createTime',
    order:'descending'
  },
  column: [
    {
      label: '消息类型',
      prop: 'repType',
      type: 'select',
      dicUrl: '/upms/dict/type/wx_req_type',
      search:true,
      sortable:true,
      width: 120
    },
    {
      label: '用户',
      prop: 'nickName',
      overHidden: false,
      align: 'right',
      search: true,
      slot: true,
      width: 100
    },{
      label: '内容',
      prop: 'repContent',
      overHidden: true,
      align: 'left',
      slot: true
    },{
      label: '时间',
      type: 'date',
      prop: 'createTime',
      sortable: true,
      width: 200
    },
	  {
      label: '是否已读',
      prop: 'readFlag',
      type: 'select',
      dicUrl: '/upms/dict/type/yes_no',
      search:true,
      sortable:true,
      slot:true,
      width: 50
    }
  ]
}
