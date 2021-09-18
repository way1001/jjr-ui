/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
    // dialogDrag: true,
    dialogType: 'drawer',
    border: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    menuType: 'text',
    searchShow: false,
    addBtn: false,
    editBtn: true,
    delBtn: false,
    column: [
        {
            label: '售楼地址',
            prop: 'salesAddress',
            display: false,
        },
        {
            label: '建筑类型',
            prop: 'architecturalTypes',
            display: false
        },
        {
            label: '装修标准',
            prop: 'decorationStandard',
            display: false
        },
        {
            label: '开发商',
            prop: 'developers',
            display: false
        },
        {
            label: '容积率',
            prop: 'plotRatio',
            display: false
        },
        {
            label: '绿化率',
            prop: 'greeningRate',
            display: false
        },
        {
            label: '规划用户',
            prop: 'planningUser',
            display: false
        },
        {
            label: '占地面积',
            prop: 'coverArea',
            display: false
        },
        {
            label: '建筑面积',
            prop: 'floorArea',
            display: false
        },
        {
            label: '规划用户',
            prop: 'planningUser',
            display: false
        },
        {
            label: '车位数',
            prop: 'parkingNumber',
            display: false
        },
        {
            label: '车位配比',
            prop: 'parkingRatio',
            display: false
        },
        {
            label: '工程进度',
            prop: 'projectSchedule',
            display: false
        },
        //         {
        //     label: '周边',
        //     prop: 'periphery',
        //     display: false
        // },
        {
            label: '描述',
            prop: 'description',
            display: false
        },
    ],
    group: [
        {
            icon: 'el-icon-goods',
            label: '详情信息',
            prop: 'group1',
            column: [
                {
                    label: '售楼地址',
                    prop: 'salesAddress',
                },
                {
                    label: '建筑类型',
                    prop: 'architecturalTypes',
                },
                {
                    label: '装修标准',
                    prop: 'decorationStandard',
                },
                {
                    label: '开发商',
                    prop: 'developers',
                },
                {
                    label: '容积率',
                    prop: 'plotRatio',
                },
                {
                    label: '绿化率',
                    prop: 'greeningRate',
                },

                {
                    label: '占地面积',
                    prop: 'coverArea',
                },
                {
                    label: '建筑面积',
                    prop: 'floorArea',
                },
                {
                    label: '规划用户',
                    prop: 'planningUser',
                },
                {
                    label: '车位数',
                    prop: 'parkingNumber',
                },
                {
                    label: '车位配比',
                    prop: 'parkingRatio',
                },
                {
                    label: '工程进度',
                    prop: 'projectSchedule',
                },
            ]
        },
        {
            icon: 'el-icon-s-order',
            label: '周边信息',
            prop: 'group2',
            column: [
                // {
                //           label: '周边',
                //           prop: 'periphery',
                //       },
                {
                    prop: 'surrounding',
                    formslot: true,
                    span: 24
                }
            ]
        },
        {
            icon: 'el-icon-grape',
            label: '简介信息',
            prop: 'group3',
            column: [
                {
                    label: '描述',
                    prop: 'description',
                    formslot: true,
                    span: 16
                }]
        }]
}
// export const tableOption = {
//   dialogDrag: true,
//   border: true,
//   indexLabel: '序号',
//   stripe: true,
//   menuAlign: 'center',
//   align: 'center',
//   menuType: 'text',
//   searchShow: false,
//   excelBtn: true,
//   printBtn: true,
//   viewBtn: true,
//   column: [
//     {
//       label: 'PK',
//       prop: 'id',
//       sortable: true
//     },
//     {
//       label: '所属租户',
//       prop: 'tenantId',
//       sortable: true
//     },
//     {
//       label: '逻辑删除标记（0：显示；1：隐藏）',
//       prop: 'delFlag',
//       sortable: true
//     },
//     {
//       label: '创建时间',
//       prop: 'createTime',
//       sortable: true
//     },
//     {
//       label: '最后更新时间',
//       prop: 'updateTime',
//       sortable: true
//     },
//     {
//       label: '创建者ID',
//       prop: 'createId',
//       sortable: true
//     },
//     {
//       label: '售楼地址',
//       prop: 'salesAddress',
//       sortable: true
//     },
//     {
//       label: '建筑类型 这个可以手输 比方 住宅：高层',
//       prop: 'architecturalTypes',
//       sortable: true
//     },
//     {
//       label: '装修标准',
//       prop: 'decorationStandard',
//       sortable: true
//     },
//     {
//       label: '开发商',
//       prop: 'developers',
//       sortable: true
//     },
//     {
//       label: '容积率',
//       prop: 'plotRatio',
//       sortable: true
//     },
//     {
//       label: '绿化率',
//       prop: 'greeningRate',
//       sortable: true
//     },
//     {
//       label: '规划用户',
//       prop: 'planningUser',
//       sortable: true
//     },
//     {
//       label: '占地面积',
//       prop: 'coverArea',
//       sortable: true
//     },
//     {
//       label: '建筑面积',
//       prop: 'floorArea',
//       sortable: true
//     },
//     {
//       label: '车位数',
//       prop: 'parkingNumber',
//       sortable: true
//     },
//     {
//       label: '车位配比',
//       prop: 'parkingRatio',
//       sortable: true
//     },
//     {
//       label: '工程进度',
//       prop: 'projectSchedule',
//       sortable: true
//     },
//     {
//       label: '描述',
//       prop: 'description',
//       sortable: true
//     },
//   ]
// }
