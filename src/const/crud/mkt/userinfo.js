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
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    menuType: 'text',
    searchShow: false,
    viewBtn: true,
    searchMenuSpan: 6,
    column: [
        {
            label: '用户编码',
            prop: 'userCode',
            sortable: true,
            editDisplay: false,
            addDisplay: false,
        },
        {
            label: '创建时间',
            prop: 'createTime',
            sortable: true,
            addDisplay: false,
            editDisplay: false,
        },

        {
            label: '手机号码',
            prop: 'phone',
            addDisplay: false,
            editDisplay: false,
            sortable: true,
        },
        {
            label: '用户角色',
            prop: 'userRole',
            type: 'select',
            sortable: true,
            props: {
                label: 'roleName',
                value: 'roleCode'
            },
            dicUrl: '/mkt/userrole/list',
        },
        {
            label: '真实姓名',
            prop: 'realName',
            search: true,
            sortable: true,
            rules: [
                {
                    max: 32,
                    message: '长度在不能超过32个字符'
                },
            ]
        },
        {
            label: '昵称',
            prop: 'nickName',
            sortable: true,
            rules: [
                {
                    max: 64,
                    message: '长度在不能超过64个字符'
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
            span: 24,
            slot: true,
            formslot: true
        },
        {
            label: '所在城市',
            prop: 'city',
            sortable: true,

        },
        {
            label: '所在省份',
            prop: 'province',
            sortable: true,
        },
        {
            label: '隶属楼盘',
            prop: 'affiliated',
            type: 'select',
            multiple: true,
            dataType: 'array',
            row: true,
            cascaderIndex: 0,
            props: {
                label: 'projectName',
                value: 'id',
            },
            dicUrl: `/mkt/basicinfo/list`,
            rules: [
                {
                    required: true,
                    message: '请选择隶属楼盘',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '关联租户',
            prop: 'associationTenants',

        },
        {
            label: '关联楼盘',
            prop: 'associationAffiliation',

        },
    ]
}
