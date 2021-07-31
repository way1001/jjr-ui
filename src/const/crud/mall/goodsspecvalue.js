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
    excelBtn: true,
    printBtn: true,
    viewBtn: true,
    searchMenuSpan: 6,
    column: [
        {
            label: '名称',
            prop: 'name',
            sortable: true,
            rules: [{
              required: true,
              message: '请输入名称',
              trigger: 'blur'
            },{
              max: 50,
              message: '长度在不能超过50个字符'
            }]
        },
        {
            label: '创建时间',
            prop: 'createTime',
            sortable: true,
            addDisplay: false,
            editDisplay: false
        },
        {
            label: '更新时间',
            prop: 'updateTime',
            sortable: true,
            addDisplay: false,
            editDisplay: false
        },
    ]
}
