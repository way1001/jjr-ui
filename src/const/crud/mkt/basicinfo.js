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
    dialogWidth: '88%',
    addBtn: true,
    delBtn: false,
    column: [
        {
            label: '楼盘code',
            prop: 'affiliationCode',
            editDisplay: false,
            addDisplay: false,
            sortable: true,
            rules: [
                {
                    required: true,
                    message: '请输入楼盘code',
                    trigger: 'blur'
                },
            ]
        },
        {
            label: '创建时间',
            prop: 'createTime',
            editDisplay: false,
            addDisplay: false,
            sortable: true,
            rules: [
                {
                    required: true,
                    message: '请输入创建时间',
                    trigger: 'blur'
                },
            ]
        },
        // {
        //     label: '状态',
        //     prop: 'delFlag',
        //     type: 'radio',
        //     slot: true,
        //     span: 24,
        //     rules: [{
        //       required: true,
        //       message: '请选择是否启用',
        //       trigger: 'blur'
        //     }],
        //     dicData: [{
        //       label: '显示',
        //       value: '0'
        //     }, {
        //       label: '停用',
        //       value: '1'
        //     }]
        //   },
        {
            label: '项目名称',
            prop: 'projectName',
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
            label: '销售状态',
            prop: 'salesStatus',
            span: 24,
            type: 'radio',
            rules: [{
                required: true,
                message: '请选择是销售状态',
                trigger: 'blur'
            }],
            dicData: [{
                label: '在售',
                value: '0'
            }, {
                label: '待售',
                value: '1'
            }, {
                label: '售馨',
                value: '2'
            }]
        },
        {
            label: '均价',
            prop: 'price',
        },
        {
            label: '户型',
            prop: 'houseType',
            span: 24,
            tip: '可以按需求户型组合，按空格分离'
        },
        {
            label: '建筑类型',
            prop: 'residenceType',
            span: 24,
            type: 'radio',
            rules: [{
                required: true,
                message: '请选择建筑类型',
                trigger: 'blur'
            }],
            dicData: [{
                label: '住房',
                value: '1'
            }, {
                label: '商住',
                value: '2'
            }, {
                label: '公寓',
                value: '3'
            }, {
                label: '别墅',
                value: '4'
            }]
        },
        {
            label: '平台页首图',
            prop: 'firstFigure',
            width: 80,
            dataType: 'array',
            slot: true,
            formslot: true,
            span: 24,
            // type: 'img',
            // listType: 'picture-card',
        },
        {
            label: '关键字',
            prop: 'keywords',
            span: 24,
            tip: '可以按需求关键字组合，按空格分离'
        },
        {
            label: '户型面积',
            prop: 'floorage',
            sortable: true,
            rules: [
                {
                    required: true,
                    message: 'xx~xxx',
                    trigger: 'blur'
                },
            ]
        },
        {
            label: '区域',
            prop: 'region',
            type: 'select',
            sortable: true,
            props: {
                label: 're',
                value: 're'
            },
            dicUrl: '/mkt/platforminfo/regions',
        },
        {
            label: '地址',
            prop: 'address',
            sortable: true,
            rules: [
                {
                    max: 100,
                    message: '长度在不能超过100个字符'
                },
            ]
        },
        {
            label: '经纬度',
            prop: 'longitude',
            span: 24,
            formslot: true,
          },
          // {
          //   label: '纬度',
          //   prop: 'latitude',
          // },
        {
            label: '楼盘电话',
            prop: 'premisesMobile',
        },
        {
            label: '开盘日期',
            prop: 'openingDate',
        },
        // {
        //     label: '浏览量',
        //     prop: 'views',
        //     sortable: true,
        //     rules: [
        //     ]
        // },
        {
            label: '排序字段',
            prop: 'sort',
            type: 'number',
            sortable: true,
            rules: [
                {
                    required: true,
                    message: '请输入排序字段',
                    trigger: 'blur'
                },
            ]
        },
        {
            label: '有效期',
            prop: 'validity',
        },
        {
            label: '选择置业顾问',
            prop: 'counselor',
            span: 24,
            type: 'radio',
            rules: [{
                required: true,
                message: '选择置业顾问',
                trigger: 'blur'
            }],
            dicData: [{
                label: '允许',
                value: '0'
            }, {
                label: '不允许',
                value: '1'
            }]
        },
        {
            label: '佣金说明',
            type: 'textarea',
            span: 16,
            prop: 'commission',
        },
        {
            label: '详情链接',
            type: 'textarea',
            span: 16,
            prop: 'linkProfiles',
        },
    ]
}
