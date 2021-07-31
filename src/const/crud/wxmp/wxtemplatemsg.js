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
            label: '是否启用',
            prop: 'enable',
            type: 'radio',
            search: true,
            sortable: true,
            rules: [{
                required: true,
                message: '请选择启用状态',
                trigger: 'blur'
            }],
            dicData: [{
                label: '关闭',
                value: '0'
            },{
                label: '启用',
                value: '1'
            }]
        },
        {
            label: '用途',
            prop: 'useType',
            type: 'select',
            search: true,
            sortable: true,
            rules: [{
                required: true,
                message: '请选择用途',
                trigger: 'blur'
            }],
            dicData: [{
                label: '新客户审核通知',
                value: '1'
            },{
                label: '报备审核超时提醒',
                value: '2'
            },{
                label: '报备驳回提醒',
                value: '3'
              },{
                label: '审核结果通知',
                value: '4'
              },{
                label: '新客户通知',
                value: '5'
              },{
                label: '报备审核通过通知',
                value: '6'
              },{
                label: '指派带看人通知',
                value: '7'
              },{
                label: '客户分配提醒',
                value: '8'
              },{
                label: '客户跟踪提醒',
                value: '9'
              },{
                label: '客户保护到期提醒',
                value: '10'
              },{
                label: '客户失效通知',
                value: '11'
              },{
                label: '报备重复提醒',
                value: '12'
              },{
                label: '客户分配成功通知',
                value: '13'
              }]
        },
        {
            label: '模板ID',
            prop: 'priTmplId',
            rules: [{
                required: true,
                message: '请输入模板ID',
                trigger: 'blur'
            }],
        },
        {
            label: '模版标题',
            prop: 'title',
            rules: [{
                required: true,
                message: '请输入模版标题',
                trigger: 'blur'
            }],
        },
        {
            label: '模版内容',
            prop: 'content',
            type: 'textarea',
            rules: [{
                required: true,
                message: '请输入模版内容',
                trigger: 'blur'
            }],
        }
    ]
}
