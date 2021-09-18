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
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    menuType: 'text',
    searchShow: false,
    excelBtn: true,
    printBtn: true,
    viewBtn: true,
    column: [
                {
            label: 'PK',
            prop: 'id',
            sortable: true
        },
                {
            label: '所属租户',
            prop: 'tenantId',
            sortable: true
        },
                {
            label: '详情Id',
            prop: 'detailsId',
            sortable: true
        },
                {
            label: '名称',
            prop: 'name',
            sortable: true
        },
                {
            label: '描述',
            prop: 'content',
            sortable: true
        },
                {
            label: '创建时间',
            prop: 'createTime',
            sortable: true
        },
                {
            label: '最后更新时间',
            prop: 'updateTime',
            sortable: true
        },
            ]
}
