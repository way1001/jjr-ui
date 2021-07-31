/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.aiforest.com
 * 注意：
 * 本软件为www.aiforest.com开发研制，未经购买不得使用
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
    addBtn: false,
    searchMenuSpan: 6,
    column: [
        {
            label: '创建者ID',
            prop: 'createId',
            sortable: true,
            editDisplay: false,
            rules: [
                {
                    max: 32,
                    message: '长度在不能超过32个字符'
                },
            ]
        },
        {
            label: '创建时间',
            prop: 'createTime',
            sortable: true,
            editDisplay: false,
        },
        {
            label: '推荐Id',
            prop: 'referralsId',
            sortable: true,
            editDisplay: false,
        },
        {
            label: '跟踪记录图片',
            prop: 'urls',
            width: 80,
            dataType: 'array',
            slot: true,
            formslot: true,
            span: 24,
            editDisplay: false,
        },
        {
            label: '跟踪记录',
            prop: 'content',
            editDisplay: false,

        },
        {
            label: '办理类型',
            prop: 'handleType',
            search: true,
            slot: true,
            editDisplay: false,
            // formslot: true,
            type: 'radio',
            dicData: [{
                label: '跟办',
                value: '0'
            }, {
                label: '来访/带看',
                value: '1'
            }, {
                label: '成交确认',
                value: '2'
            }]
        },
        {
            label: '审核状态',
            prop: 'auditStatus',
            search: true,
            slot: true,
            // formslot: true,
            type: 'radio',
            dicData: [{
                label: '通过',
                value: '1'
            }, {
                label: '不通过',
                value: '2'
            }]
        },
    ]
}
