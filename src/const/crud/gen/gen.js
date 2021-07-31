export const tableOption = {
  dialogDrag:true,
  border: true,
  index: true,
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  excelBtn: true,
  printBtn: true,
  menuType:'text',
  searchMenuSpan: 6,
  column: [{
    label: '表名称',
    prop: 'tableName',
    sortable:true,
    align: 'center'
  }, {
    label: '表说明',
    prop: 'tableComment',
    align: 'center'
  }, {
    label: '索引',
    prop: 'ENGINE',
    align: 'center',
    hide: true
  }, {
    type: 'datetime',
    valueFormat: 'timestamp',
    format: 'yyyy-MM-dd hh:mm:ss',
    label: '创建时间',
    sortable:true,
    prop: 'createTime',
    align: 'center'
  }]
}

export const formOption = {
  emptyBtn: false,
  column: [
    {
      label: '表名称',
      prop: 'tableName',
      disabled: true
    }, {
      label: '服务名',
      prop: 'genKey',
      type: 'select',
      sortable:true,
      align: 'center',
      rules: [{
        required: true,
        message: '请输入服务路由key',
        trigger: 'blur'
      }],
      dicUrl: '/gen/generator/genkey/list',
    }, {
      label: '包名',
      prop: 'packageName',
      placeholder: '默认com.aiforest.cloud'
    }, {
      label: '模块',
      prop: 'moduleName',
      placeholder: '默认gen'
    }, {
      label: '作者',
      prop: 'author',
      placeholder: '默认aiforest'
    }, {
      label: '表前缀',
      prop: 'tablePrefix',
      placeholder: '生成的类将自动去掉指定前缀'
    }, {
      label: '注释',
      prop: 'tableComment',
      placeholder: '加载表备注'
    }
  ]
}

export const tableDsOption = {
  dialogDrag:true,
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  column: [
    {
      label: '主键',
      prop: 'id',
      hide: true,
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '创建时间',
      prop: 'createTime',
      addDisplay: false,
      editDisplay: false,
      overHidden: true
    },
    {
      label: '更新时间',
      prop: 'updateTime',
      overHidden: true,
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '用户名',
      prop: 'username'
    },
    {
      label: '密码',
      prop: 'password'
    },
    {
      label: '名称',
      prop: 'name'
    },
    {
      label: 'jdbcUrl',
      prop: 'url',
      type: 'textarea',
      overHidden: true
    },
  ]
}
