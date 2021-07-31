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
      <el-row :span="24" :gutter="10">
        <el-col :xs="24"
                :sm="24"
                :md="3">
          <el-card shadow="never">
            <div slot="header">
              <span>小程序名称</span>
            </div>
            <el-input
              placeholder="输入关键字进行过滤"
              size="mini"
              v-model="filterText">
            </el-input>
            <el-tree
              style="margin-top: 5px"
              :data="treeWxAppData"
              :props="treeWxAppProps"
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
                :md="21">
          <el-tabs v-model="status" type="card" @tab-click="handleClickStatus">
            <el-tab-pane name="0">
              <span slot="label"><i class="el-icon-bank-card"></i> 未审核</span>
            </el-tab-pane>
            <el-tab-pane name="1">
              <span slot="label"><i class="el-icon-refrigerator"></i> 审核中</span>
            </el-tab-pane>
            <el-tab-pane name="2">
              <span slot="label"><i class="el-icon-s-order"></i> 审核通过</span>
            </el-tab-pane>
            <el-tab-pane name="3">
              <span slot="label"><i class="el-icon-document"></i> 审核驳回</span>
            </el-tab-pane>
          </el-tabs>
          <avue-crud ref="crud"
                     v-model="form"
                     :page.sync="page"
                     :data="tableData"
                     :table-loading="tableLoading"
                     :option="tableOption"
                     :permission="permissionList"
                     :before-close="beforeClose"
                     @on-load="getPage"
                     @refresh-change="refreshChange"
                     @row-update="handleUpdate"
                     @row-save="handleSave"
                     @row-del="handleDel"
                     @sort-change="sortChange"
                     @search-change="searchChange">
            <template slot="menu" slot-scope="scope">
              <el-button icon="el-icon-position"
                         size="small"
                         type="text"
                         v-if="permissions['wxma:wxmalivegoods:edit'] && status == '3'"
                         @click="audit(scope.row,scope.index)">提交审核
              </el-button>
            </template>
            <template slot="coverImgUrlForm" slot-scope="scope">
              <el-upload
                class="avatar-uploader"
                :action="'/weixin/wxmamedia/upload?mediaType=image&appId='+appId"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadCoverImgSuccess">
                <span v-if="form.coverImgUrl">{{form.coverImgUrl}}</span>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </template>
            <template slot="coverImgUrl" slot-scope="scope">
              <el-image :src="scope.row.coverImgUrl"></el-image>
            </template>
            <template slot="price" slot-scope="scope">
              {{scope.row.priceType == 1 ? scope.row.price : scope.row.priceType == 2 ? scope.row.price+'~'+scope.row.price2 : scope.row.priceType == 3 ? scope.row.price2 : ''}}
            </template>
          </avue-crud>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
  import { getPage, getObj, addObj, putObj, delObj, audit} from '@/api/wxma/wxlivegoods'
  import { getList as getWxAppList } from '@/api/wxmp/wxapp'
  import { tableOption } from '@/const/crud/wxma/wxlivegoods'
  import { mapGetters } from 'vuex'
  import store from "@/store"

  export default {
    name: 'wxlive',
    data() {
      return {
        headers: {
          Authorization: 'Bearer ' + store.getters.access_token
        },
        filterText: '',
        treeWxAppProps: {
          label: 'name',
          value: 'id'
        },
        treeWxAppData: [],
        appId: null,
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
          ascs: [],
          descs: 'create_time'
        },
        form: {},
        paramsSearch:{},
        tableLoading: false,
        tableOption: tableOption,
        status: '2'
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
      'form.priceType'(){
        let column =this.tableOption.column[5]
        let column2 =this.tableOption.column[6]
        if(this.form.priceType===1){
          column.display = true
          column2.display = false
          column.label = '价格'
        }
        if(this.form.priceType===2){
          column.display = true
          column2.display = true
          column.label = '价格左区间'
          column2.label = '价格右区间'
        }
        if(this.form.priceType===3){
          column.display = true
          column2.display = true
          column.label = '原价'
          column2.label = '现价'
        }
      },
    },
    created() {
      this.getWxAppList()
    },
    mounted: function() { },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.permissions['wxma:wxmalivegoods:add'] ? true : false,
          delBtn: this.permissions['wxma:wxmalivegoods:del'] ? true : false,
          editBtn: this.permissions['wxma:wxmalivegoods:edit'] ? true : false,
          viewBtn: this.permissions['wxma:wxmalivegoods:get'] ? true : false
        }
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      //加载小程序列表
      getWxAppList(){
        getWxAppList({
          appType: '1'
        }).then(response => {
          let data = response.data
          this.treeWxAppData = data
          if(data && data.length > 0){
            //默认加载第一个小程序的数据
            this.nodeClick({
              id: data[0].id
            })
          }
        }).catch(() => {

        })
      },
      nodeClick(data) {
        if(this.appId != data.id){
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(data.id)
          })
          this.page.currentPage = 1
          this.appId = data.id
          this.paramsSearch = {}
          // this.$refs.crud.searchReset()
          this.getPage(this.page)
        }
      },
      searchChange(params,done){
        params = this.filterForm(params)
        this.paramsSearch = params
        this.page.currentPage = 1
        this.getPage(this.page,params)
        done()
      },
      sortChange(val){
        let prop = val.prop ? val.prop.replace(/([A-Z])/g,"_$1").toLowerCase() : '';
        if(val.order=='ascending'){
          this.page.descs = []
          this.page.ascs = prop
        }else if(val.order=='descending'){
          this.page.ascs = []
          this.page.descs = prop
        }else{
          this.page.ascs = []
          this.page.descs = []
        }
        this.getPage(this.page)
      },
      changeGoods(goods) {
        if(goods){
          this.form.name = goods.name;
        } else {
          this.form.name = ''
        }
      },
      changeGoodsUrl(value) {
        if(value.indexOf('/')===0){
          this.form.url = value.substring(1, value.length);
        } else {
          this.form.url = ''
        }
      },
      handleClickStatus(tab, event) {
        this.status = tab.name
        this.page.currentPage = 1
        this.getPage(this.page)
      },
      uploadCoverImgSuccess(response, file, fileList){
        if(response.code != 0){
          this.$message({
            showClose: true,
            message: '上传'+response.msg,
            type: 'error'
          })
        }else{
          this.form.coverImgUrl = response.data.mediaId
        }
      },
      getPage(page, params) {
        if(this.appId){
          this.tableLoading = true
          getPage(Object.assign({
            current: page.currentPage,
            size: page.pageSize,
            descs: this.page.descs,
            ascs: this.page.ascs,
            appId: this.appId,
            status: this.status
          }, params, this.paramsSearch)).then(response => {
            let goods = response.data.data.goods
            this.tableData = goods
            this.page.total = response.data.data.total
            this.page.currentPage = page.currentPage
            this.page.pageSize = page.pageSize
            this.tableLoading = false
          }).catch(() => {
            this.tableLoading = false
          })
        }
      },
      handleDel: function(row, index) {
        var _this = this
        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delObj(_this.appId, row.goodsId)
        }).then(data => {
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getPage(this.page)
        }).catch(function(err) { })
      },
      /**
       * @title 数据更新
       * @param row 为当前的数据
       * @param index 为当前更新数据的行数
       * @param done 为表单关闭函数
       *
       **/
      handleUpdate: function(row, index, done, loading) {
        putObj(Object.assign(
          row,{
            appId: this.appId
          }
        )).then(data => {
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
      handleSave: function(row, done, loading) {
        addObj(Object.assign(
          row,{
            appId: this.appId
          }
        )).then(data => {
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
      refreshChange() {
        this.getPage(this.page)
      },
      beforeClose(done,type){
        this.tableOption.column[5].label = '价格'
        done()
      },
      /**
       * 小程序直播商品提交审核
       * @param row
       * @param index
       */
      audit(row, index){
        this.tableLoading = true
        audit({
          appId: this.appId,
          goodsId: row.goodsId
        }).then(data => {
          this.$message({
            showClose: true,
            message: '提交审核成功',
            type: 'success'
          })
          this.getPage(this.page)
        }).catch(() => {
          this.tableLoading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
