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
              <template slot="thumbnailForm"
                        slot-scope="scope">
                <MaterialList v-model="scope.row.thumbnail" type="image" :num=1 :width=300 :height=150></MaterialList>
              </template>
              <template slot="thumbnail" slot-scope="scope">
                <img
                  style="height: 100px;width: 200px"
                  :src="scope.row.thumbnail">
              </template>
              <template slot="details" slot-scope="scope">
                <span>点击查看按钮查看详情</span>
              </template>
              <template slot="detailsForm" slot-scope="scope">
                <BaseEditor v-model="scope.row.details"/>
              </template>
              <template slot="delFlag" slot-scope="scope">
                <el-switch
                  active-value="1"
                  inactive-value="0"
                  v-model="scope.row.delFlag"
                  active-color="#13ce66"
                  inactive-color="#cccccc">
                </el-switch>
              </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
    import {getPage, getObj, addObj, putObj, delObj} from '@/api/mkt/newstrends'
    import {tableOption} from '@/const/crud/mkt/newstrends'
    import {mapGetters} from 'vuex'
    import MaterialList from '@/components/material/list.vue'
    import BaseEditor from '@/components/editor/BaseEditor.vue'

    export default {
      components: {
        MaterialList,
        BaseEditor
      },
        name: 'newstrends',
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
                tableOption: tableOption
            }
        },
        created() {
        },
        mounted: function () {
        },
        computed: {
            ...mapGetters(['permissions']),
            permissionList() {
                return {
                    // addBtn: this.vaildData(this.permissions.estate_newstrends_add, false),
                    // delBtn: this.vaildData(this.permissions.estate_newstrends_del, false),
                    // editBtn: this.vaildData(this.permissions.estate_newstrends_edit, false),
                    // viewBtn: this.vaildData(this.permissions.estate_newstrends_get, false)
                  addBtn: this.permissions['mkt:newstrends:add'] ? true : false,
                  delBtn: this.permissions['mkt:newstrends:del'] ? true : false,
                  editBtn: this.permissions['mkt:newstrends:edit'] ? true : false,
                  viewBtn: this.permissions['mkt:newstrends:get'] ? true : false
                };
            }
        },
        methods: {
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
                this.tableLoading = true
                getPage(Object.assign({
                    current: page.currentPage,
                    size: page.pageSize,
                    descs: this.page.descs,
                    ascs: this.page.ascs,
                    affiliationId: '',
                }, params, this.paramsSearch)).then(response => {
                  let tableData = response.data.data.records
                  tableData.forEach(item => {
                    item.thumbnail = [item.thumbnail]
                  })
                    this.tableData = tableData
                    this.page.total = response.data.data.total
                    this.page.currentPage = page.currentPage
                    this.page.pageSize = page.pageSize
                    this.tableLoading = false
                }).catch(() => {
                    this.tableLoading = false
                })
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
              row.thumbnail = row.thumbnail[0]
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
              row.thumbnail = row.thumbnail[0]
              row.affiliationId = ''
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
