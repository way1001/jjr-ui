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
            label: '角色名',
            prop: 'roleName',
            rules: [
                {
                    required: true,
                    message: '请输入roleName',
                    trigger: 'blur'
                },
                {
                    max: 64,
                    message: '长度在不能超过64个字符'
                },
            ]
        },
        {
            label: '角色编码',
            prop: 'roleCode',
            rules: [
                {
                    required: true,
                    message: '请输入roleCode',
                    trigger: 'blur'
                },
                {
                    max: 64,
                    message: '长度在不能超过64个字符'
                },
            ]
        },
        {
            label: '角色描述',
            prop: 'roleDesc',
            type: 'textarea',
            span: 24,
            rules: [
                {
                    max: 255,
                    message: '长度在不能超过255个字符'
                },
            ]
        },
        {
            label: '第三方关联',
            prop: 'shareType',
            type: 'radio',
            dicData: [{
                label: '不关联',
                value: '0'
            }, {
                label: '关联',
                value: '1'
            }]
        },
        // {
        //     label: '分组归属',
        //     prop: 'groupBelong',
        //     type: 'radio',
        //     dicData: [{
        //         label: '非必须',
        //         value: '0'
        //     }, {
        //         label: '强制归属',
        //         value: '1'
        //     }]
        // },
    ]
}
