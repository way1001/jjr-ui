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
    excelBtn: true,
    printBtn: true,
    viewBtn: true,
    searchMenuSpan: 6,
    column: [
            {
            label: 'PK',
            prop: 'id',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入PK',
                        trigger: 'blur'
                    },
                                    {
                        max: 32,
                        message: '长度在不能超过32个字符'
                    },
                ]
        },
            {
            label: '所属租户',
            prop: 'tenantId',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入所属租户',
                        trigger: 'blur'
                    },
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
            rules: [
                    {
                        required: true,
                        message: '请输入最后更新时间',
                        trigger: 'blur'
                    },
                                ]
        },
            {
            label: '创建者ID',
            prop: 'createId',
            sortable: true,
            rules: [
                                    {
                        max: 32,
                        message: '长度在不能超过32个字符'
                    },
                ]
        },
            {
            label: '项目名称',
            prop: 'platformName',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入项目名称',
                        trigger: 'blur'
                    },
                                    {
                        max: 60,
                        message: '长度在不能超过60个字符'
                    },
                ]
        },
            {
            label: '负责人',
            prop: 'principal',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入负责人',
                        trigger: 'blur'
                    },
                                    {
                        max: 60,
                        message: '长度在不能超过60个字符'
                    },
                ]
        },
            {
            label: '平台电话',
            prop: 'platformPhone',
            sortable: true,
            rules: [
                                    {
                        max: 15,
                        message: '长度在不能超过15个字符'
                    },
                ]
        },
            {
            label: '默认中间2位',
            prop: 'suppressionNumber',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入默认中间2位',
                        trigger: 'blur'
                    },
                                    {
                        max: 2,
                        message: '长度在不能超过2个字符'
                    },
                ]
        },
            {
            label: '免责声明',
            prop: 'disclaimer',
            sortable: true,
            rules: [
                                    {
                        max: 65535,
                        message: '长度在不能超过65535个字符'
                    },
                ]
        },
            {
            label: '注册协议',
            prop: 'registrationProtocol',
            sortable: true,
            rules: [
                                    {
                        max: 65535,
                        message: '长度在不能超过65535个字符'
                    },
                ]
        },
            {
            label: '平台省份',
            prop: 'platformProvince',
            sortable: true,
            rules: [
                                    {
                        max: 20,
                        message: '长度在不能超过20个字符'
                    },
                ]
        },
            {
            label: '平台城市',
            prop: 'platformCity',
            sortable: true,
            rules: [
                                    {
                        max: 20,
                        message: '长度在不能超过20个字符'
                    },
                ]
        },
            {
            label: '平台城市',
            prop: 'platformCountry',
            sortable: true,
            rules: [
                                    {
                        max: 20,
                        message: '长度在不能超过20个字符'
                    },
                ]
        },
            {
            label: '区域定义',
            prop: 'regionsType',
            sortable: true,
            rules: [
                                    {
                        max: 200,
                        message: '长度在不能超过200个字符'
                    },
                ]
        },
            ]
}
