<!--
  - Copyright (C) 2018-2019
  - All rights reserved, Designed By www.aiforest.com
  - 注意：
  - 本软件为www.aiforest.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="execution">
    <basic-container>
      <el-row :span="24" :gutter="10">
        <el-col :xs="24" :sm="24" :md="4">
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
        <el-col :xs="24" :sm="24" :md="20" class="user__main">
          <el-row :span="24" :gutter="10">
            <el-col :xs="24" :sm="24" :md="5">
              <el-card shadow="never">
                <div slot="header">
                  <span>流程名称</span>
                </div>
                <el-input
                  placeholder="输入关键字进行过滤"
                  size="mini"
                  v-model="filterText"
                >
                </el-input>
                <el-tree
                  style="margin-top: 5px"
                  :data="treeDefinitionData"
                  :props="treeDefinitionProps"
                  :filter-node-method="filterNodeDef"
                  node-key="id"
                  default-expand-all
                  ref="treeDef"
                  @node-click="nodeClickDef"
                >
                </el-tree>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="19" class="user__main">
              <avue-crud
                ref="crud"
                :page="page"
                :data="tableData"
                :permission="permissionList"
                :table-loading="tableLoading"
                :option="tableOption"
                v-model="form"
                @on-load="getPage"
                @refresh-changedata="refreshChange"
                @row-update="handleUpdate"
                @row-save="handleSave"
                @row-del="handleDel"
                @sort-change="sortChange"
                @search-change="searchChange"
              >
                <template
                  slot="menuLeft"
                  v-if="defaultBpmnConfig.indexOf(defKey) > -1"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-refresh"
                    size="small"
                    v-if="tableData.length > 0"
                    >重置默认配置</el-button
                  >
                  <el-button
                    type="warning"
                    icon="el-icon-circle-plus-outline"
                    size="small"
                    v-else
                    @click="createDefaultConfiguration(defKey)"
                    >创建默认配置</el-button
                  >
                </template>
                <template slot="variableValueForm" slot-scope="scope">
                  <el-input-number
                    v-model="scope.row.variableInteger"
                    v-if="scope.row.variableType === 'integer'"
                  ></el-input-number>
                  <el-input
                    v-model="scope.row.variableString"
                    v-if="scope.row.variableType === 'string'"
                  ></el-input>
                  <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="scope.row.variableBoolean"
                    active-color="#13ce66"
                    inactive-color="#cccccc"
                    v-if="scope.row.variableType === 'boolean'"
                  >
                  </el-switch>
                  <!--active-value和inactive-value的值分别是字符串的1和2,如果你赋值为数字类型的 1 或 2是无法正常工作的，
                  若赋值为数值类型，需这样写-->
                  <!--https://blog.csdn.net/Ares0412/article/details/107861136/-->
                </template>
                <template slot="variableValue" slot-scope="scope">
                  <span v-if="scope.row.variableType === 'string'">{{
                    scope.row.variableString
                  }}</span>
                  <span v-if="scope.row.variableType === 'integer'">{{
                    scope.row.variableInteger
                  }}</span>
                  <span v-if="scope.row.variableType === 'boolean'">{{
                    scope.row.variableBoolean === 1
                  }}</span>
                </template>
              </avue-crud>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import {
  getPage,
  getObj,
  addObj,
  putObj,
  delObj,
  addBatchObj,
} from "@/api/mkt/variabledefinition";
import { definitionsService } from "@/api/mkt/definitions";
import { tableOption } from "@/const/crud/mkt/variabledefinition";
import { marketingOption } from "@/const/bpmn/marketing";

import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { getAll } from "@/api/mkt/basicinfo";

export default {
  name: "variabledefinition",
  data() {
    return {
      form: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
        ascs: [], //升序字段
        descs: [], //降序字段
      },
      paramsSearch: {},
      tableLoading: false,
      tableOption: tableOption,
      defId: null,
      defKey: null,
      treeDefinitionProps: {
        label: "name",
        value: "id",
      },
      treeDefinitionData: [],
      defaultBpmnConfig: ["marketing"],
      filterTextDef: "",
      marketingOption: marketingOption,
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
  mounted: function () {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    filterTextDef(val) {
      this.$refs.treeDef.filter(val);
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: !!this.permissions["mkt:variabledefinition:add"],
        delBtn: !!this.permissions["mkt:variabledefinition:del"],
        editBtn: !!this.permissions["mkt:variabledefinition:edit"],
        viewBtn: !!this.permissions["mkt:variabledefinition:get"],
      };
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
        this.affId = data.id;
        // this.paramsSearch = {}
        // this.$refs.crud.searchReset()
        this.handleDefinition();
      }
    },
    filterNodeDef(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleDefinition() {
      // getAll().then(response => {
      //   let data = response.data.data
      //   this.treeDefinitionData = data
      //   if(data && data.length > 0){
      //     this.nodeClick(data[0])
      //   }
      // }).catch(() => {
      //
      // })
      let _this = this
      definitionsService.list(Object.assign({ tenantIdIn: _this.affId })).then(
        (res) => {
          let data = res.data;
          _this.treeDefinitionData = data;
          if (data && data.length > 0) {
            _this.nodeClickDef(data[0]);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    nodeClickDef(data) {
      if (this.defId !== data.id) {
        this.$nextTick(() => {
          this.$refs.treeDef.setCurrentKey(data.id);
        });
        this.page.currentPage = 1;
        this.defId = data.id;
        this.defKey = data.key;
        this.paramsSearch = {};
        // this.$refs.crud.searchReset()

        this.getPage(this.page);
      }
    },
    searchChange(params, done) {
      params = this.filterForm(params);
      this.paramsSearch = params;
      this.page.currentPage = 1;
      this.getPage(this.page, params);
      done();
    },
    sortChange(val) {
      let prop = val.prop
        ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase()
        : "";
      if (val.order === "ascending") {
        this.page.descs = [];
        this.page.ascs = prop;
      } else if (val.order === "descending") {
        this.page.ascs = [];
        this.page.descs = prop;
      } else {
        this.page.ascs = [];
        this.page.descs = [];
      }
      this.getPage(this.page);
    },
    getPage(page, params) {
      if (this.defId) {
        this.tableLoading = true;
        getPage(
          Object.assign(
            {
              current: page.currentPage,
              size: page.pageSize,
              descs: this.page.descs,
              ascs: this.page.ascs,
              affiliationId: this.affId,
              tenantId: this.userInfo.tenantId,
              definitionId: this.defId,
            },
            params,
            this.paramsSearch
          )
        )
          .then((response) => {
            this.tableData = response.data.data.records;
            this.page.total = response.data.data.total;
            this.page.currentPage = page.currentPage;
            this.page.pageSize = page.pageSize;
            this.tableLoading = false;
          })
          .catch(() => {
            this.tableLoading = false;
          });
      }
    },

    /**
     * @title 数据删除
     * @param row 为当前的数据
     * @param index 为当前删除数据的行数
     *
     **/
    handleDel: function (row, index) {
      let _this = this;
      this.$confirm("是否确认删除此数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(row.id);
        })
        .then((data) => {
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          this.getPage(this.page);
        })
        .catch(function (err) {});
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function (row, index, done, loading) {
      putObj(row)
        .then((response) => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          done();
          this.getPage(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function (row, done, loading) {
      row.definitionId = this.defId;
      row.definitionKey = this.defKey;
      row.affiliationId = this.affId;
      row.tenantId = this.userInfo.tenantId;
      addObj(row)
        .then((response) => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success",
          });
          done();
          this.getPage(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    /**
     * 刷新回调
     */
    refreshChange(page) {
      this.getPage(this.page);
    },

    createDefaultConfiguration(key) {
      let array = [];
      switch (key) {
        case "marketing":
          this.marketingOption.map((item, index) => {
            array.push(
              Object.assign(item, {
                tenantId: this.userInfo.tenantId,
                definitionId: this.defId,
                definitionKey: this.defKey,
                affiliationId: this.affId,
              })
            );
          });
          addBatchObj(array)
            .then((response) => {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success",
              });
              this.getPage(this.page);
            })
            .catch(() => {});
          break;  
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
