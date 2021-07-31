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
            label: '变量Id',
            prop: 'variableId',
            rules: [
                    {
                        required: true,
                        message: '请输入变量Id',
                        trigger: 'blur'
                    },
                                    {
                        max: 64,
                        message: '长度在不能超过64个字符'
                    },
                ]
        },
            {
            label: '变量类型',
            prop: 'variableType',
            rules: [
                    {
                        required: true,
                        message: '请选择变量类型',
                        trigger: 'blur'
                    },
                                    {
                        max: 32,
                        message: '长度在不能超过32个字符'
                    },
                ],
              type: 'select',
              dicData: [{
                label: '字符串类型',
                value: 'string'
              }, {
                label: '布尔类型',
                value: 'boolean'
              }, {
                label: '整型',
                value: 'integer'
              }]
        },
            {
            label: '变量标签',
            prop: 'variableLabel',
            rules: [
                    {
                        required: true,
                        message: '请输入变量标签',
                        trigger: 'blur'
                    },
                                    {
                        max: 64,
                        message: '长度在不能超过64个字符'
                    },
                ]
        },
          {
          label: '默认值',
          prop: 'variableValue',
          slot: true,
          formslot: true,
          rules: [
                              ]
      },
      //     {
        //     label: '字符串变量',
        //     prop: 'variableString',
        //     rules: [
        //                             {
        //                 max: 64,
        //                 message: '长度在不能超过64个字符'
        //             },
        //         ]
        // },
        //     {
        //     label: '布尔变量',
        //     prop: 'variableBoolean',
        //     rules: [
        //                         ]
        // },
        //     {
        //     label: '整形变量',
        //     prop: 'variableInteger',
        //     rules: [
        //                         ]
        // },
      {
        label: '描述',
        prop: 'description',
        type: 'textarea',
      },
        //     {
        //     label: '定义Id',
        //     prop: 'definitionId',
        //     addDisplay: false,
        //     editDisplay: false,
        //     rules: [
        //                             {
        //                 max: 64,
        //                 message: '长度在不能超过64个字符'
        //             },
        //         ]
        // },
        //     {
        //     label: '定义Key',
        //     prop: 'definitionKey',
        //       addDisplay: false,
        //       editDisplay: false,
        //     rules: [
        //                             {
        //                 max: 64,
        //                 message: '长度在不能超过64个字符'
        //             },
        //         ]
        // },
            ]
}
