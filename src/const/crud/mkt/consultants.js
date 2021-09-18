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
            editDisplay: false,
            addDisplay: false,
            rules: [
                {
                    required: true,
                    message: '请输入创建时间',
                    trigger: 'blur'
                },
            ]
        },
        {
            label: '最后更新时间',
            prop: 'updateTime',
            sortable: true,
            editDisplay: false,
            addDisplay: false,
            rules: [
                {
                    required: true,
                    message: '请输入最后更新时间',
                    trigger: 'blur'
                },
            ]
        },
        {
            label: '手机号码',
            prop: 'phone',
            rules: [
                {
                    max: 15,
                    message: '长度在不能超过15个字符'
                },
            ]
        },
        {
            label: '职位',
            prop: 'position',
            rules: [
                {
                    max: 32,
                    message: '长度在不能超过32个字符'
                },
            ]
        },
        {
            label: '真实姓名',
            prop: 'realName',
            rules: [
                {
                    max: 32,
                    message: '长度在不能超过32个字符'
                },
            ]
        },
        {
            label: '性别',
            prop: 'sex',
            sortable: true,
            type: 'radio',
            dicData: [{
                label: '未知',
                value: '0'
            }, {
                label: '男',
                value: '1'
            }, {
                label: '女',
                value: '2'
            }
            ],
        },
        {
            label: '头像',
            prop: 'headimgUrl',
            dataType: 'array',
            slot: true,
            formslot: true,
            minWidth: 150,
            span: 16,
        },
        {
            label: '介绍',
            prop: 'about',
            type: 'textarea',
            span: 16,
            rules: [
                {
                    max: 255,
                    message: '长度在不能超过255个字符'
                },
            ]
        },
        {
            label: '用户二维码',
            prop: 'userQrcode',
            dataType: 'array',
            slot: true,
            formslot: true,
            minWidth: 150,
            span: 16,
        }
    ]
}
