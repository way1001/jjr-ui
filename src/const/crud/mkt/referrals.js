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
    excelBtn: true,
    viewBtn: true,
    addBtn: false,
    searchMenuSpan: 6,
    column: [
            {
            label: '关联楼盘ID',
            prop: 'affiliationId',
            sortable: true,
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
            rules: [
                    {
                        required: true,
                        message: '请输入创建时间',
                        trigger: 'blur'
                    },
                                ]
        },
            {
            label: '更新时间',
            prop: 'updateTime',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入更新时间',
                        trigger: 'blur'
                    },
                                ]
        },
            {
            label: '客户手机号码',
            prop: 'phone',
            search: true,
            sortable: true,
            rules: [
                                    {
                        max: 15,
                        message: '长度在不能超过15个字符'
                    },
                ]
        },
            {
            label: '客户姓名',
            prop: 'customerName',
            search: true,
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入客户姓名',
                        trigger: 'blur'
                    },
                                    {
                        max: 64,
                        message: '长度在不能超过64个字符'
                    },
                ]
        },
            {
            label: '性别',
            prop: 'gender',
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
            label: '描述',
            prop: 'description',
            sortable: true,
            rules: [
                                    {
                        max: 255,
                        message: '长度在不能超过255个字符'
                    },
                ]
        },
        //     {
        //     label: '经纪人ID',
        //     prop: 'brokerId',
        //     sortable: true,
        //     rules: [
        //                             {
        //                 max: 32,
        //                 message: '长度在不能超过32个字符'
        //             },
        //         ]
        // },
            {
            label: '经纪人姓名',
            prop: 'brokerName',
            sortable: true,
            rules: [
                                    {
                        max: 64,
                        message: '长度在不能超过64个字符'
                    },
                ]
        },
            {
            label: '经纪人号码',
            prop: 'brokerPhone',
            sortable: true,
            rules: [
                                    {
                        max: 15,
                        message: '长度在不能超过15个字符'
                    },
                ]
        },
            {
            label: '业务员ID',
            prop: 'salesmanId',
            sortable: true,
            rules: [
                                    {
                        max: 32,
                        message: '长度在不能超过32个字符'
                    },
                ]
        },
            {
            label: '当前办理人',
            prop: 'currentHandler',
            sortable: true,
            rules: [
                                    {
                        max: 32,
                        message: '长度在不能超过32个字符'
                    },
                ]
        },
            {
            label: '话事人',
            prop: 'staffId',
            sortable: true,
            rules: [
                                    {
                        max: 32,
                        message: '长度在不能超过32个字符'
                    },
                ]
        },
            {
            label: '流程实例',
            prop: 'instanceId',
            sortable: true,
            rules: [
                                    {
                        max: 64,
                        message: '长度在不能超过64个字符'
                    },
                ]
        },
            {
            label: '流程状态',
            prop: 'workflowStatus',
            sortable: true,
            type: 'radio',
            dicData: [{
                label: '活跃',
                value: '0'
            }, {
                label: '到期',
                value: '1'
            }, {
                label: '挂起',
                value: '2'
            }, {
                label: '无效',
                value: '4'
            }],
        },
            {
            label: '帮带看',
            prop: 'substitute',
            type: 'radio',
            dicData: [{
                label: '帮带看',
                value: '0'
            }, {
                label: '自行带看',
                value: '1'
            }, {
                label: '陪同',
                value: '2'
            }],
        },
        //     {
        //     label: '客户分类 0全名经纪推荐 1自有客户',
        //     prop: 'classified',
        //     sortable: true,
        //     rules: [
        //             {
        //                 required: true,
        //                 message: '请输入客户分类 0全名经纪推荐 1自有客户',
        //                 trigger: 'blur'
        //             },
        //                             {
        //                 max: 2,
        //                 message: '长度在不能超过2个字符'
        //             },
        //         ]
        // },
        //     {
        //     label: '发起人ID',
        //     prop: 'initiatorId',
        //     sortable: true,
        //     rules: [
        //                             {
        //                 max: 32,
        //                 message: '长度在不能超过32个字符'
        //             },
        //         ]
        // },
        //     {
        //     label: '公共池 默认为0 进池为1',
        //     prop: 'commonPool',
        //     sortable: true,
        //     rules: [
        //             {
        //                 required: true,
        //                 message: '请输入公共池 默认为0 进池为1',
        //                 trigger: 'blur'
        //             },
        //                             {
        //                 max: 2,
        //                 message: '长度在不能超过2个字符'
        //             },
        //         ]
        // },
        //     {
        //     label: 'A,B,C,D',
        //     prop: 'grade',
        //     sortable: true,
        //     rules: [
        //                             {
        //                 max: 2,
        //                 message: '长度在不能超过2个字符'
        //             },
        //         ]
        // },
            ]
}
