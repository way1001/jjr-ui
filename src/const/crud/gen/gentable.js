/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.aiforest.net
 * 注意：
 * 本软件为www.aiforest.net开发研制，未经购买不得使用
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
            label: 'PK',
            prop: 'id',
            sortable: true
        },
                {
            label: '逻辑删除标记（0：显示；1：隐藏）',
            prop: 'delFlag',
            sortable: true
        },
                {
            label: '创建时间',
            prop: 'createTime',
            sortable: true
        },
                {
            label: '最后更新时间',
            prop: 'updateTime',
            sortable: true
        },
                {
            label: '创建者ID',
            prop: 'createId',
            sortable: true
        },
                {
            label: '表名',
            prop: 'tableName',
            sortable: true
        },
                {
            label: '表描述',
            prop: 'tableComment',
            sortable: true
        },
                {
            label: '生成包路径',
            prop: 'packageName',
            sortable: true
        },
                {
            label: '生成模块名',
            prop: 'moduleName',
            sortable: true
        },
                {
            label: '作者',
            prop: 'author',
            sortable: true
        },
                {
            label: '表前缀',
            prop: 'tablePrefix',
            sortable: true
        },
            ]
}
