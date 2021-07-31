<template>
  <div class="app-container">
    <BpmnDrawer v-if="dialogFormVisible" ref="bpmndrawer" @close="dialogFormVisible=false" @exportXML="exportXML"/>
    <div v-else>
      <el-row :span="24" :gutter="10">
        <el-col :xs="24"
                :sm="24"
                :md="5">
          <el-card shadow="never">
            <div slot="header">
              <span>楼盘名称</span>
            </div>
            <el-input
              placeholder="输入关键字进行过滤"
              size="mini"
              v-model="filterText">
            </el-input>
            <el-tree
              style="margin-top: 5px"
              :data="treeAffiliationData"
              :props="treeAffiliationProps"
              :filter-node-method="filterNode"
              node-key="id"
              default-expand-all
              ref="tree"
              @node-click="nodeClick">
            </el-tree>
          </el-card>
        </el-col>
        <el-col :xs="24"
                :sm="24"
                :md="18"
                class="user__main">
      <div class="filter-container">
        <el-input v-model="listQuery.name" size="small" placeholder="模型名称" style="width: 120px;margin-right: 10px" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button type="primary" size="small" icon="el-icon-search" class="filter-item" @click="handleFilter">查 询</el-button>
        <el-button type="primary" size="small" class="filter-item" icon="el-icon-refresh" @click="resetForm">重 置</el-button>
      </div>

      <el-table
        v-loading="listLoading"
        :data="objList"
        border
        style="width: 100%;">
        <el-table-column label="id" prop="id" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="流程名称" prop="name" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="流程编码" prop="key" align="center" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column label="楼盘Id" prop="tenantId" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.tenantId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="流程版本" prop="version" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.version }}</span>
          </template>
        </el-table-column>
        <el-table-column width="250" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleAddOrEdit(scope.row)">绘图</el-button>
            <el-button size="mini" type="primary" @click="startFlow(scope.row)" disabled>发起流程</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.pageNo"
        :limit.sync="listQuery.pageSize"
        @pagination="getList(affId)"/>
        </el-col>
      </el-row>
      <!--</basic-container>-->
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/pagination' // secondary package based on el-pagination
import { definitionsService } from '@/api/mkt/definitions'
import { deploymentService } from '@/api/mkt/deployment'
import { processService } from '@/api/mkt/process'
import BpmnDrawer from '@/views/bpmn/bpmnDrawer.vue'
import blankbpmn from '../blankbpmn'
import {mapState } from 'vuex'
import {getAll} from '@/api/mkt/basicinfo'

export default {
  name: 'Model',
  components: {
    Pagination,
    BpmnDrawer
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        T: 'success',
        F: 'danger'
      }
      return statusMap[status]
    }
  },
  data: function() {
    return {
      showCheckBox: true,
      editable: false,
      defaultChecked: { checkedpermissions: [], checkedrouters: [] },
      objList: [],
      dialogFormVisible: false,
      listLoading: true,
      total: 0,
      xmlmodel: undefined,
      listQuery: {
        pageNo: 1,
        pageSize: 20,
        createDate: undefined,
        latest: true
      },
      affId: null,
      treeAffiliationProps: {
        label: 'projectName',
        value: 'id'
      },
      treeAffiliationData: [],
      filterText: '',
    }
  },
  created() {
    this.handleAffiliation()
  },
  computed: {
    // ...mapState({
    //   userInfo: state => state.user.userInfo
    // }),
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.projectName.indexOf(value) !== -1
    },
    handleAffiliation() {
      getAll().then(response => {
        let data = response.data.data
        this.treeAffiliationData = data
        if(data && data.length > 0){
          this.nodeClick(data[0])
        }
      }).catch(() => {

      })

    },
    nodeClick(data) {
      if(this.affId !== data.id){
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(data.id)
        })
        this.total = 0
        this.affId = data.id
        // this.paramsSearch = {}
        // this.$refs.crud.searchReset()
        this.getList(this.affId)

      }
    },
    getList(affId) {
      this.dialogFormVisible = false
      this.listLoading = true
      var _this = this
      definitionsService.count(Object.assign({tenantIdIn: affId}, this.listQuery)).then(function(cres) {
        _this.listQuery.firstResult = (_this.listQuery.pageNo - 1) * _this.listQuery.pageSize
        _this.listQuery.maxResults = _this.listQuery.pageNo * _this.listQuery.pageSize
        definitionsService.list(Object.assign({tenantIdIn: affId}, _this.listQuery)).then(res => {
          _this.objList = res.data
          _this.total = cres.data.count
          _this.listLoading = false
        }, err => {
          console.log(err)
          _this.listLoading = false
        })
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList(this.affId)
    },
    startFlow: function(item) {
      var params = {
        'processDefinitionId': item.id,
        'businessKey': 'myBusinessKey',
        'returnVariables': true,
        'variables': { 'employee': {
          'value': 'aStringValue',
          'type': 'String'
        }}
      }
      processService.start(params).then(function(res) {
        console.log(res)
      })
    },
    resetForm() {
      this.listQuery = {}
    },
    dateRangeChange(data) {
      if (data) {
        this.listQuery.start_time = data[0]
        this.listQuery.end_time = data[1]
      }
    },
    handleAddOrEdit(item) {
      var _this = this
      this.dialogFormVisible = true
      if (item) {
        definitionsService.getBPMNXML(item.id).then(function(res) {
          _this.$nextTick(() => {
            _this.$refs.bpmndrawer.initCanvas(res.data.bpmn20Xml, item.id, item.name, item.tenantId)
          })
        })
      } else {
        _this.$nextTick(() => {
          _this.$refs.bpmndrawer.initCanvas(blankbpmn, item.id, item.name, item.tenantId)
        })
      }
    },
    exportXML: function(xml, filename, tenantId) {
      var _this = this

      if (tenantId !== '' && tenantId !== undefined && tenantId !== null && tenantId !== 'non') {
        deploymentService.deployment(xml, filename, tenantId).then(function() {
          _this.showDraw = false
          _this.getList(_this.affId)
        })
      } else {
        deploymentService.deployment(xml, filename, _this.affId).then(function() {
          _this.showDraw = false
          _this.getList(_this.affId)
        })
      }
    }
  }
}
</script>
<style>
  .app-container {
    padding: 10px;
  }
  .filter-container {
    padding-bottom: 10px;
  }
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
</style>
