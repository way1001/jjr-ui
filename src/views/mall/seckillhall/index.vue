<!--
  - Copyright (C) 2018-2019
  - All rights reserved, Designed By www.aiforest.net
  - 注意：
  - 本软件为www.aiforest.net开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="execution">
    <basic-container>
      <avue-crud ref="crud"
                 :page.sync="page"
                 :data="tableData"
                 :permission="permissionList"
                 :table-loading="tableLoading"
                 :option="tableOption"
                 :before-open="beforeOpen"
                 v-model="form"
                 @on-load="getPage"
                 @refresh-change="refreshChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 @row-del="handleDel"
                 @sort-change="sortChange"
                 @search-change="searchChange">
        <template slot="enable" slot-scope="scope">
          <el-switch
            active-value="1"
            inactive-value="0"
            v-model="scope.row.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeEnable(scope.row)">
          </el-switch>
        </template>
        <template slot="listSeckillInfoForm" slot-scope="scope">
          <div>
            <el-button size="mini" icon="el-icon-plus" type="primary" @click="showSeckillInfoList()">选择秒杀商品</el-button>
            <el-row :gutter="4">
              <el-col :span="3" v-for="(item, index) in scope.row.listSeckillInfo" :key="item.id">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="item.picUrl" class="image">
                  <div style="padding: 4px;">
                    <el-tooltip effect="dark" :content="item.name" placement="top-start">
                      <span class="overflow_1" style="font-size: 10px">{{item.name}}</span>
                    </el-tooltip>
                    <div class="bottom clearfix">
                      <el-button type="text" class="button" size="mini" round @click="removeSeckillInfo(index)"
                                 style="color: red">移除
                      </el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </template>
      </avue-crud>
      <el-dialog title="请选择秒杀商品" :visible.sync="dialogVisibleSeckillInfo" width="90%" top="20px">
        <avue-crud ref="crud"
                   v-model="form2"
                   :page.sync="page2"
                   :data="tableData2"
                   :table-loading="tableLoading2"
                   :option="tableOption2"
                   @on-load="getPage2"
                   @refresh-change="refreshChange2"
                   @sort-change="sortChange2"
                   @search-change="searchChange2"
                   @selection-change="selectionChange2">
          <template slot="picUrl" slot-scope="scope">
            <img
              style="height: 100px"
              :src="scope.row.picUrl">
          </template>
        </avue-crud>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleSeckillInfo = false">取 消</el-button>
                  <el-button type="primary" @click="subGoods">确 定</el-button>
                </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
  import {getPage, getObj, addObj, putObj, delObj} from '@/api/mall/seckillhall'
  import {getPage as getPage2} from '@/api/mall/seckillinfo'
  import {tableOption} from '@/const/crud/mall/seckillhall'
  import {tableOption2} from '@/const/crud/mall/seckillinfo'
  import {mapGetters} from 'vuex'

  export default {
    name: 'seckillhall',
    data() {
      return {
        form: {},
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
        form2: {},
        tableData2: [],
        page2: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20, // 每页显示多少条
          ascs: [],//升序字段
          descs: []//降序字段
        },
        paramsSearch2: {},
        tableLoading2: false,
        tableOption2: tableOption2,
        selectionSeckillInfo: [],
        dialogVisibleSeckillInfo: false,
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
          addBtn: this.permissions['mall:seckillhall:add'] ? true : false,
          delBtn: this.permissions['mall:seckillhall:del'] ? true : false,
          editBtn: this.permissions['mall:seckillhall:edit'] ? true : false,
          viewBtn: this.permissions['mall:seckillhall:get'] ? true : false
        };
      }
    },
    methods: {
      removeSeckillInfo(index){
        this.form.listSeckillInfo.splice(index, 1)
      },
      subGoods(){
        this.form.listSeckillInfo = this.selectionSeckillInfo
        this.dialogVisibleSeckillInfo = false
      },
      selectionChange2(list){
        this.selectionSeckillInfo = list
      },
      getPage2(page, params) {
        this.tableLoading2 = true
        getPage2(Object.assign({
          current: page.currentPage,
          size: page.pageSize,
          descs: this.page2.descs,
          ascs: this.page2.ascs
        }, params, this.paramsSearch2)).then(response => {
          let tableData = response.data.data.records
          this.tableData2 = tableData
          this.page2.total = response.data.data.total
          this.page2.currentPage = page.currentPage
          this.page2.pageSize = page.pageSize
          this.tableLoading2 = false
        }).catch(() => {
          this.tableLoading2 = false
        })
      },
      searchChange2(params,done) {
        params = this.filterForm(params)
        this.paramsSearch2 = params
        this.page2.currentPage = 1
        this.getPage2(this.page2, params)
        done()
      },
      refreshChange2(val) {
        this.getPage2(val.page)
      },
      sortChange2(val) {
        let prop = val.prop ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase() : '';
        if (val.order == 'ascending') {
          this.page2.descs = []
          this.page2.ascs = prop
        } else if (val.order == 'descending') {
          this.page2.ascs = []
          this.page2.descs = prop
        } else {
          this.page2.ascs = []
          this.page2.descs = []
        }
        this.getPage(this.page)
      },
      showSeckillInfoList() {
        this.tableData2 = []
        this.dialogVisibleSeckillInfo = true
        this.getPage2(this.page2)
      },
      beforeOpen(done,type){
        if(type == 'edit' || type == 'view'){//如果是修改、查看操作，加载关联商品
          getObj(this.form.id).then(response => {
            let obj = response.data.data
            this.form.listSeckillInfo = obj.listSeckillInfo
          }).catch(() => {

          })
        }
        done()
      },
      searchChange(params, done) {
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
        }, params, this.paramsSearch)).then(response => {
          this.tableData = response.data.data.records
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
        let selectionSeckillInfo = row.listSeckillInfo
        let listSeckillInfo = []
        if(selectionSeckillInfo){
          selectionSeckillInfo.forEach(function (val, index) {//过滤无用数据
            listSeckillInfo.push({
              id: val.id
            })
          })
        }
        row.listSeckillInfo = listSeckillInfo
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
        let selectionSeckillInfo = row.listSeckillInfo
        let listSeckillInfo = []
        if(selectionSeckillInfo){
          selectionSeckillInfo.forEach(function (val, index) {//过滤无用数据
            listSeckillInfo.push({
              id: val.id
            })
          })
        }
        row.listSeckillInfo = listSeckillInfo
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
        this.getPage(this.page)
      },
      changeEnable(row) {
        putObj({
          id: row.id,
          enable: row.enable
        }).then(data => {

        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    height: 120px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
