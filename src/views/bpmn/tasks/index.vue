<template>
  <div class="app-container">
    <el-row :span="24" :gutter="10">
      <el-col :xs="24" :sm="24" :md="5">
        <el-card shadow="never">
          <div slot="header">
            <span>楼盘名称</span>
          </div>
          <el-input
            placeholder="输入关键字进行过滤"
            size="mini"
            v-model="filterText"
          >
          </el-input>
          <el-tree
            style="margin-top: 5px"
            :data="treeAffiliationData"
            :props="treeAffiliationProps"
            :filter-node-method="filterNode"
            node-key="id"
            default-expand-all
            ref="tree"
            @node-click="nodeClick"
          >
          </el-tree>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" class="user__main">
        <div class="filter-container">
          <el-input
            v-model="listQuery.name"
            size="small"
            placeholder="模型名称"
            style="width: 120px; margin-right: 10px"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            class="filter-item"
            @click="handleFilter"
            >查 询</el-button
          >
          <el-button
            type="primary"
            size="small"
            class="filter-item"
            icon="el-icon-refresh"
            @click="resetForm"
            >重 置</el-button
          >
        </div>

        <el-table
          v-loading="listLoading"
          :data="objList"
          border
          style="width: 100%"
        >
          <el-table-column label="id" prop="id" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="模型名称" prop="name" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="办理人" prop="assignee" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.assignee }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="描述"
            prop="description"
            align="center"
            width="160"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="楼盘Id" prop="tenantId" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.tenantId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column width="250" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="complete(scope.row)"
                >办理</el-button
              >
              <el-button size="mini" type="primary" @click="endWorkFlow(scope.row)"
                >结束任务</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.pageNo"
          :limit.sync="listQuery.pageSize"
          @pagination="getList(affId)"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from "@/components/pagination"; // secondary package based on el-pagination
import { tasksService } from "@/api/mkt/tasks";
import BpmnDrawer from "@/views/bpmn/bpmnDrawer.vue";
import { mapState } from "vuex";
import { getAll } from "@/api/mkt/basicinfo";

export default {
  name: "Model",
  components: {
    Pagination,
    BpmnDrawer,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        T: "success",
        F: "danger",
      };
      return statusMap[status];
    },
  },
  data: function () {
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
        latest: true,
      },
      affId: null,
      treeAffiliationProps: {
        label: "projectName",
        value: "id",
      },
      treeAffiliationData: [],
      filterText: "",
    };
  },
  created() {
    this.handleAffiliation();
  },
  computed: {
    // ...mapState({
    //   userInfo: state => state.user.userInfo
    // }),
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.projectName.indexOf(value) !== -1;
    },
    handleAffiliation() {
      getAll()
        .then((response) => {
          let data = response.data.data;
          this.treeAffiliationData = data;
          if (data && data.length > 0) {
            this.nodeClick(data[0]);
          }
        })
        .catch(() => {});
    },
    nodeClick(data) {
      if (this.affId !== data.id) {
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(data.id);
        });
        this.total = 0;
        this.affId = data.id;
        // this.paramsSearch = {}
        // this.$refs.crud.searchReset()
        this.getList(this.affId);
      }
    },
    getList(affId) {
      this.dialogFormVisible = false;
      this.listLoading = true;
      var _this = this;
      tasksService
        .count(Object.assign({ tenantIdIn: affId }, this.listQuery))
        .then(function (cres) {
          _this.listQuery.firstResult =
            (_this.listQuery.pageNo - 1) * _this.listQuery.pageSize;
          _this.listQuery.maxResults =
            _this.listQuery.pageNo * _this.listQuery.pageSize;
          tasksService
            .list(Object.assign({ tenantIdIn: affId }, _this.listQuery))
            .then(
              (res) => {
                _this.objList = res.data;
                _this.total = cres.data.count;
                _this.listLoading = false;
              },
              (err) => {
                console.log(err);
                _this.listLoading = false;
              }
            );
        });
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.getList(this.affId);
    },
    complete: function (item) {
      var params = {
        withVariablesInReturn: true,
        variables: {
          aVariable: { value: "aStringValue" },
          anotherVariable: { value: 42 },
          aThirdVariable: { value: true },
        },
      };
      var _this = this;
      tasksService.complete(item.id, params).then(function (res) {
        console.log(res);
        _this.getList(_this.affId);
      });
    },
    endWorkFlow(item) {
      var params = {
       "value" : "true", "type": "Boolean"
      };
      var _this = this;
      tasksService.endtask(item.processInstanceId, 'endTask', params).then(function (res) {
        console.log(res);
        _this.getList(_this.affId);
      });
    },
    resetForm() {
      this.listQuery = {};
    },
    dateRangeChange(data) {
      if (data) {
        this.listQuery.start_time = data[0];
        this.listQuery.end_time = data[1];
      }
    },
  },
};
</script>
<style>
.filter-container {
  padding-bottom: 10px;
}
.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
}
</style>
