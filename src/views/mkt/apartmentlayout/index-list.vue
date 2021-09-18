<!--
  - Copyright (C) 2018-2019
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
    <div class="execution">
        <basic-container>
          <el-row :span="24" :gutter="10">
            <el-col :xs="24"
                    :sm="24"
                    :md="3">
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
                    :md="20"
                    class="user__main">
            <avue-crud ref="crud"
                       :page="page"
                       :data="tableData"
                       :permission="permissionList"
                       :table-loading="tableLoading"
                       :option="tableOption"
                       @on-load="getPage"
                       @refresh-change="refreshChange"
                       @row-update="handleUpdate"
                       @row-save="handleSave"
                       @row-del="handleDel"
                       @sort-change="sortChange"
                       @search-change="searchChange">
              <template slot="srcForm"
                        slot-scope="scope">
                <MaterialList v-model="scope.row.src" type="image" :num=1 :width=300 :height=150></MaterialList>
              </template>
              <template slot="src" slot-scope="scope">
                <img
                  style="width: 100px"
                  :src="scope.row.src">
              </template>
              <template slot="categoryForm" slot-scope="scope">
                <el-select v-model="scope.row.category" placeholder="请选择户型分类">
                  <el-option
                    v-for="item in houseType"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </template>
              <template slot="isStick" slot-scope="scope">
                <el-switch
                  active-value="1"
                  inactive-value="0"
                  v-model="scope.row.isStick"
                  active-color="#13ce66"
                  inactive-color="#cccccc"
                  @change="handleUpdate(scope.row)">
                </el-switch>
              </template>
            </avue-crud>
            </el-col>
          </el-row>
        </basic-container>
    </div>
</template>

<script>
    import {getPage, getObj, addObj, putObj, delObj} from '@/api/mkt/apartmentlayout'
    import {tableOption} from '@/const/crud/mkt/apartmentlayout'
    import {mapGetters} from 'vuex'
    import {getAll} from '@/api/mkt/basicinfo'
    import MaterialList from '@/components/material/list.vue'

    export default {
      components: {
        MaterialList,
      },
        name: 'apartmentlayout',
        data() {
            return {
                tableData: [],
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20, // 每页显示多少条
                    ascs: [],//升序字段
                    descs: []//降序字段
                },
                paramsSearch: {},
                tableLoading: false,
                tableOption: tableOption,
              houseType: [],
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
          // this.getHouseType()
        },

        mounted: function () {
        },
        computed: {
            ...mapGetters(['permissions']),
            permissionList() {
                return {
                    addBtn: this.permissions["mkt:apartmentlayout:add"] ? true : false,
                    delBtn: this.permissions["mkt:apartmentlayout:del"] ? true : false,
                    editBtn: this.permissions["mkt:apartmentlayout:edit"] ? true : false,
                    viewBtn: this.permissions["mkt:apartmentlayout:get"] ? true : false,
                };
            }
        },
      watch: {
        filterText(val) {
          this.$refs.tree.filter(val)
        }
      },
        methods: {
          // changeStick: function (row, index, done, loading) {
          //   row.src = row.src[0]
          //
          //   putObj(row).then(response => {
          //     this.$message({
          //       showClose: true,
          //       message: '修改成功',
          //       type: 'success'
          //     })
          //     done()
          //     this.getPage(this.page)
          //   }).catch(() => {
          //     loading()
          //   })
          // },
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
              this.page.currentPage = 1
              this.affId = data.id
              this.paramsSearch = {}
              // this.$refs.crud.searchReset()
              this.houseType = data.houseType ? data.houseType : {}

              this.getPage(this.page)
            }
          },
          // getHouseType() {
          //   getObj2().then(response => {
          //     this.houseType = response.data.data.houseType ? response.data.data.houseType : {}
          //   })
          // },
          trimStr(str){
            return str.replace(/(^\s*)|(\s*$)/g,"");
          },
            searchChange(params,done) {
                params = this.filterForm(params)
                this.paramsSearch = params
                this.page.currentPage = 1
                this.getPage(this.page, params)
                done()
            },
            sortChange(val) {
                let prop = val.prop ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase() : ''
                if (val.order == 'ascending') {
                    this.page.descs = []
                    this.page.ascs = prop
                } else if (val.order == 'descending') {
                    this.page.ascs = []
                    this.page.descs = prop
                } else {
                    this.page.ascs = []
                    this.page.descs = []
                }
                this.getPage(this.page)
            },
            getPage(page, params) {
              if(this.affId){
                this.tableLoading = true
                getPage(Object.assign({
                  current: page.currentPage,
                  size: page.pageSize,
                  descs: this.page.descs,
                  ascs: this.page.ascs,
                  affiliationId: this.affId,
                }, params, this.paramsSearch)).then(response => {
                  let tableData = response.data.data.records
                  tableData.forEach(item => {
                    item.src = [item.src]
                  })
                  this.tableData = tableData
                  // this.tableData = response.data.data.records
                  this.page.total = response.data.data.total
                  this.page.currentPage = page.currentPage
                  this.page.pageSize = page.pageSize
                  this.tableLoading = false
                }).catch(() => {
                  this.tableLoading = false
                })
              }
            },
            /**
             * @title 数据删除
             * @param row 为当前的数据
             * @param index 为当前删除数据的行数
             *
             **/
            handleDel: function (row, index) {
                let _this = this
                this.$confirm('是否确认删除此数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    return delObj(row.id)
                }).then(data => {
                    _this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    })
                    this.getPage(this.page)
                }).catch(function (err) {
                })
            },
            /**
             * @title 数据更新
             * @param row 为当前的数据
             * @param index 为当前更新数据的行数
             * @param done 为表单关闭函数
             *
             **/
            handleUpdate: function (row, index, done, loading) {
              row.src = row.src[0]
              // this.form.keywords = this.trimStr(this.form.keywords);
              row.keywords = this.trimStr(row.keywords);
              putObj(row).then(response => {
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    })
                    done()
                    this.getPage(this.page)
                }).catch(() => {
                    loading()
                })
            },
            /**
             * @title 数据添加
             * @param row 为当前的数据
             * @param done 为表单关闭函数
             *
             **/
            handleSave: function (row, done, loading) {
              row.src = row.src[0]
              row.affiliationId = this.affId
              addObj(row).then(response => {
                    this.$message({
                        showClose: true,
                        message: '添加成功',
                        type: 'success'
                    })
                    done()
                    this.getPage(this.page)
                }).catch(() => {
                    loading()
                })
            },
            /**
             * 刷新回调
             */
            refreshChange(page) {
                this.getPage(page)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
