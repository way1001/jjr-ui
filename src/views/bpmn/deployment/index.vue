<template>
  <div class="app-container">
    <!--<div class="execution">-->
    <!--<basic-container>-->
    <BpmnDrawer
      v-if="showDraw"
      ref="bpmndrawer"
      @close="showDraw = false"
      @exportXML="exportXML"
    />
    <div v-else>
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
            <!--<el-input v-model="listQuery.name" size="small" placeholder="模型名称" style="width: 120px;margin-right: 10px" class="filter-item" @keyup.enter.native="handleFilter" />-->
            <!--<el-button size="small" type="primary" icon="el-icon-search" class="filter-item" @click="handleFilter">查 询</el-button>-->
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              class="filter-item"
              @click="handleAddOrEdit()"
              >新 增</el-button
            >
            <el-button
              size="small"
              type="primary"
              class="filter-item"
              icon="el-icon-refresh"
              @click="resetForm"
              >重 置</el-button
            >
            <h4><i class="el-icon-document"></i> 模型列表</h4>
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
                <!-- <span>{{ scope.row.name === 'baseBrokerApplication' ? '全名经纪人模型' : scope.row.name}}</span> -->
              </template>
            </el-table-column>
            <el-table-column label="租户Id" prop="tenantId" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.tenantId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="来源" prop="source" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.source }}</span>
              </template>
            </el-table-column>
            <el-table-column label="部署Id" prop="deploymentId" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id | deployedFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="部署时间"
              prop="deploymentTime"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.deploymentTime }}</span>
              </template>
            </el-table-column>
            <el-table-column width="150" fixed="right" label="操作">
              <template slot-scope="scope">
                <!--<el-button size="mini" type="success" icon="el-icon-picture-outline" circle title="绘图" @click="drawBpmn(scope.row)"/>-->
                <!--<el-button v-if="scope.row.deploymentId==null&&scope.row.sourceUrl!=null" size="mini" type="primary" icon="el-icon-upload" circle title="部署" @click="deployModel(scope.row)"/>-->
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  title="删除"
                  @click="deleteModel(scope.row)"
                />
                <el-button
                  size="small"
                  type="warning"
                  icon="el-icon-document-add"
                  circle
                  title="部署"
                  @click="noDrawExportXML(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.pageNo"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
          <div class="filter-container">
            <h4><i class="el-icon-document-copy"></i> 已部署</h4>
          </div>
          <el-table
            v-loading="listLoading"
            :data="objListByAffiliation"
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
            <el-table-column label="楼盘Id" prop="tenantId" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.tenantId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="来源" prop="source" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.source }}</span>
              </template>
            </el-table-column>
            <el-table-column label="部署Id" prop="deploymentId" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id | deployedFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="部署时间"
              prop="deploymentTime"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.deploymentTime }}</span>
              </template>
            </el-table-column>
            <el-table-column width="150" fixed="right" label="操作">
              <template slot-scope="scope">
                <!--<el-button size="mini" type="success" icon="el-icon-picture-outline" circle title="绘图" @click="drawBpmn(scope.row)"/>-->
                <!--<el-button v-if="scope.row.deploymentId==null&&scope.row.sourceUrl!=null" size="mini" type="primary" icon="el-icon-upload" circle title="部署" @click="deployModel(scope.row)"/>-->
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  title="删除"
                  @click="deleteModel(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="totalAffiliation > 0"
            :total="totalAffiliation"
            :page.sync="listQueryAffiliation.pageNo"
            :limit.sync="listQueryAffiliation.pageSize"
            @pagination="getListByAffiliation"
          />
        </el-col>
      </el-row>
      <!--</basic-container>-->
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/pagination' // secondary package based on el-pagination
// import { modelService } from '@/api/mkt/model'
import { deploymentService } from "@/api/mkt/deployment";
import { delBatchObj } from "@/api/mkt/variabledefinition";
// import request from '@/utils/flowRequest'
import request from "@/router/axios";
import BpmnDrawer from "@/views/bpmn/bpmnDrawer.vue";
import blankbpmn from "../blankbpmn";
// import ModelCreateUpdate from './create_update'
import { mapState } from "vuex";
import { getAll } from "@/api/mkt/basicinfo";

export default {
  name: "Model",
  components: {
    Pagination,
    BpmnDrawer,
    // ModelCreateUpdate
  },
  filters: {
    deployedFilter(id) {
      if (id) {
        return id;
      }
      return "未部署";
    },
  },
  data: function () {
    return {
      showCheckBox: true,
      editable: false,
      defaultChecked: { checkedpermissions: [], checkedrouters: [] },
      objList: [],
      objListByAffiliation: [],
      dialogFormVisible: false,
      listLoading: true,
      total: 0,
      showDraw: false,
      xmlmodel: undefined,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
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

      totalAffiliation: 0,
      listQueryAffiliation: {
        pageNo: 1,
        pageSize: 10,
        createDate: undefined,
        latest: true,
      },
    };
  },
  // created() {
  //   this.getList()
  //   this.getListByTenant()
  // },
  created() {
    this.getList();
    this.handleAffiliation();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  computed: {
    // ...mapState({
    //   userInfo: state => state.user.userInfo
    // }),
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
        (this.totalAffiliation = 0), (this.affId = data.id);
        // this.paramsSearch = {}
        // this.$refs.crud.searchReset()
        this.getListByAffiliation(this.affId);
      }
    },
    // tableRowClassName: function (row, index) {
    //   return row.tenantId !== 'non' ? 'hidden-row': ''
    // },
    getList() {
      this.listLoading = true;
      var _this = this;
      deploymentService
        .count(Object.assign({ tenantIdIn: "non," }, this.listQuery))
        .then(function (cres) {
          _this.listQuery.firstResult =
            (_this.listQuery.pageNo - 1) * _this.listQuery.pageSize;
          _this.listQuery.maxResults =
            _this.listQuery.pageNo * _this.listQuery.pageSize;
          deploymentService
            .list(Object.assign({ tenantIdIn: "non," }, _this.listQuery))
            .then(
              (res) => {
                _this.total = cres.data.count;
                _this.objList = res.data;
                _this.listLoading = false;
              },
              (err) => {
                console.log(err);
                _this.listLoading = false;
              }
            );
        });
      // deploymentService.count(this.listQuery).then(function(cres) {
      //   _this.listQuery.firstResult = (_this.listQuery.pageNo - 1) * _this.listQuery.pageSize
      //   _this.listQuery.maxResults = _this.listQuery.pageNo * _this.listQuery.pageSize
      //   deploymentService.list(_this.listQuery).then(res => {
      //     _this.total = cres.data.count
      //     _this.objList = res.data
      //     _this.listLoading = false
      //   }, err => {
      //     console.log(err)
      //     _this.listLoading = false
      //   })
      // })
    },
    getListByAffiliation(affId) {
      this.listLoading = true;
      var _this = this;
      deploymentService
        .count(Object.assign({ tenantIdIn: affId }, this.listQueryAffiliation))
        .then(function (cres) {
          _this.listQueryAffiliation.firstResult =
            (_this.listQueryAffiliation.pageNo - 1) *
            _this.listQueryAffiliation.pageSize;
          _this.listQueryAffiliation.maxResults =
            _this.listQueryAffiliation.pageNo *
            _this.listQueryAffiliation.pageSize;
          deploymentService
            .list(
              Object.assign({ tenantIdIn: affId }, _this.listQueryAffiliation)
            )
            .then(
              (res) => {
                _this.totalAffiliation = cres.data.count;
                _this.objListByAffiliation = res.data;
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
      // this.listQuery.pageNo = 1
      // this.getList()
      // this.listQueryAffiliation.pageNo = 1
      // this.getListByAffiliation()
    },
    // startFlow: function() {},
    resetForm() {
      this.listQuery = {};
      this.listQueryAffiliation = {};
    },
    dateRangeChange(data) {
      if (data) {
        this.listQuery.start_time = data[0];
        this.listQuery.end_time = data[1];
      }
    },
    // deployModel: function(item) {
    //   var _this = this
    //   modelService.getEditorSrc(item.id).then(function(xml) {
    //     deploymentService.deployment(xml, item.name + '.bpmn20.xml', _this.userInfo.tenantId).then(function(res) {
    //       /* 获取流程部署id*/
    //       /* 版本加1*/
    //       var params = Object.assign({}, item)
    //       params.deploymentId = res.id
    //       params.version = params.version + 1
    //       modelService.save(params)
    //       _this.getList()
    //       _this.getListByTenant()
    //     })
    //   })
    // },
    drawBpmn(item) {
      var _this = this;
      this.showDraw = true;
      /* 如果有部署id说明部署过*/

      deploymentService.resources(item.id).then(function (res) {
        request({
          url:
            "/mkt/engine-rest/deployment/" +
            item.id +
            "/resources/" +
            res.data[0].id +
            "/data",
          method: "get",
        }).then(function (xml) {
          _this.$nextTick(() => {
            _this.$refs.bpmndrawer.initCanvas(xml.data, item.id, item.name);
          });
        });
      });
    },
    handleAddOrEdit() {
      this.showDraw = true;
      this.$nextTick(() => {
        this.$refs.bpmndrawer.initCanvas(blankbpmn);
      });
    },
    exportXML: function (xml, filename, tenantId) {
      var _this = this;
      if (
        tenantId !== "" &&
        tenantId !== undefined &&
        tenantId !== null &&
        tenantId !== "non"
      ) {
        deploymentService
          .deployment(xml, filename, tenantId)
          .then(function (res) {
            _this.showDraw = false;
            _this.getListByAffiliation(_this.affId);
          });
      } else {
        deploymentService
          .deployment(xml, filename, _this.affId)
          .then(function (res) {
            _this.showDraw = false;
            _this.getListByAffiliation(_this.affId);
          });
      }
    },
    //TODO  update bpmn model on creating defintion  not to draw ，immediate to writing xml!!! 2020.10.28 by way
    noDrawExportXML(item) {
      this.listLoading = true;
      var _this = this;

      deploymentService.resources(item.id).then((res) => {
        res.data.forEach((element) => {
          request({
            url:
              "/mkt/engine-rest/deployment/" +
              item.id +
              "/resources/" +
              element.id +
              "/data",
            method: "get",
          }).then(function (xml) {
            const result = xml.data.replace(
              'isExecutable="false"',
              'isExecutable="true"'
            );
            // result.replace('isExecutable="false"', 'isExecutable="true"');
            let deploymentName = "";
            if (
              element.name !== "" &&
              element.name !== undefined &&
              element.name !== null
            ) {
              deploymentName =
                element.name.indexOf(".bpmn20.xml") !== -1
                  ? element.name
                  : element.name + ".bpmn20.xml";
            }
            deploymentService
              .deployment(result, deploymentName, _this.affId)
              .then(() => {
                _this.getListByAffiliation(_this.affId);
                _this.listLoading = false;
              });
          });
        });
      });
    },
    deleteModel: function (item) {
      var _this = this;

      deploymentService.delete(item.id).then(() => {
        _this.getList();
        _this.getListByAffiliation(_this.affId);
        //TODO can not get process definition id by deployment id
        // delBatchObj(item.id).then(response => {
        //    console.log('批量定义删除')
        // })
      });
    },
    // xml deal with trouble ！！！
    // string2XML(xmlString) {
    //   //所有浏览器统一用这种方式处理(因为高版本的浏览器都支持)
    //   let parser = new DOMParser();
    //   let xmlObject = parser.parseFromString(xmlString, "text/xml");
    //   return xmlObject;
    // },

    // //convert xml object to string (将xml对象转换成字符串)
    // xml2String(xmlObject) {
    //   //所有浏览器统一用这种方式处理(因为高版本的浏览器都支持)
    //   return new XMLSerializer().serializeToString(xmlObject);
    // },
  },
};
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
/*.el-table .hidden-row {*/
/*display: none;*/
/*}*/
</style>
