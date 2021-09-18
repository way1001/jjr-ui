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
    searchMenuSpan: 6,
    column: [
            {
            label: '创建时间',
            prop: 'createTime',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入创建时间',
                        trigger: 'blur'
                    },
                                ]
        },
            {
            label: '图片',
            prop: 'picUrls',
            sortable: true,
            rules: [
                                    {
                        max: 1024,
                        message: '长度在不能超过1024个字符'
                    },
                ]
        },
            {
            label: '弹窗链接',
            prop: 'advLink',
            sortable: true,
            rules: [
                                    {
                        max: 128,
                        message: '长度在不能超过128个字符'
                    },
                ]
        },
            {
            label: '开始时间',
            prop: 'startTime',
            sortable: true,
            rules: [
                                ]
        },
            {
            label: '结束时间',
            prop: 'endTime',
            sortable: true,
            rules: [
                                ]
        },
            {
            label: '自动隐藏（0：自动；1：否）',
            prop: 'autohide',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入自动隐藏（0：自动；1：否）',
                        trigger: 'blur'
                    },
                                    {
                        max: 2,
                        message: '长度在不能超过2个字符'
                    },
                ]
        },
            {
            label: '隐藏时间',
            prop: 'timeWrap',
            sortable: true,
            rules: [
                                ]
        },
            {
            label: '（1：开启；0：关闭）',
            prop: 'enable',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入（1：开启；0：关闭）',
                        trigger: 'blur'
                    },
                                    {
                        max: 2,
                        message: '长度在不能超过2个字符'
                    },
                ]
        },
            ]
}
