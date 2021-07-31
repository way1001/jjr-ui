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
          <avue-crud ref="crud"
                     v-model="form"
                     :page.sync="page"
                     :data="tableData"
                     :table-loading="tableLoading"
                     :option="tableOption"
                     :permission="permissionList"
                     @on-load="getPage"
                     @refresh-change="refreshChange"
                     @row-update="handleUpdate"
                     @row-save="handleSave"
                     @row-del="handleDel"
                     @sort-change="sortChange"
                     @search-change="searchChange">
            <template slot="menu" slot-scope="scope">
              <el-button icon="el-icon-share"
                         size="small"
                         type="text"
                         @click="getSharedCode(scope.row,scope.index)">分享二维码
              </el-button>
              <el-button icon="el-icon-link"
                         size="small"
                         type="text"
                         @click="getPushUrl(scope.row,scope.index)">推流地址
              </el-button>
              <el-button icon="el-icon-goods"
                         size="small"
                         type="text"
                         @click="viewGoods(scope.row,scope.index)">商品管理
              </el-button>
            </template>
            <template slot="coverImgForm" slot-scope="scope">
              <el-upload
                class="avatar-uploader"
                :action="'/weixin/wxmamedia/upload?mediaType=image&appId='+appId"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadCoverImgSuccess">
                <span v-if="form.coverImg">{{form.coverImg}}</span>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </template>
            <template slot="shareImgForm" slot-scope="scope">
              <el-upload
                class="avatar-uploader"
                :action="'/weixin/wxmamedia/upload?mediaType=image&appId='+appId"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadShareImgSuccess">
                <span v-if="form.shareImg">{{form.shareImg}}</span>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </template>
            <template slot="feedsImgForm" slot-scope="scope">
              <el-upload
                class="avatar-uploader"
                :action="'/weixin/wxmamedia/upload?mediaType=image&appId='+appId"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadFeedsImgSuccess">
                <span v-if="form.feedsImg">{{form.feedsImg}}</span>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </template>
            <template slot="coverImg" slot-scope="scope">
              <el-image :src="scope.row.coverImg"></el-image>
            </template>
            <template slot="shareImg" slot-scope="scope">
              <el-image :src="scope.row.shareImg"></el-image>
            </template>
            <template slot="feedsImg" slot-scope="scope">
              <el-image :src="scope.row.feedsImg"></el-image>
            </template>
          </avue-crud>
          <el-dialog
            title="商品管理"
            :visible.sync="dialogGoods"
            width="80%">
            <avue-crud ref="crud2"
                       v-model="form2"
                       :page.sync="page2"
                       :data="tableData2"
                       :table-loading="tableLoading2"
                       :option="tableOptionGoods">
              <template slot="menuLeft">
                <el-button icon="el-icon-add"
                           type="primary"
                           size="small"
                           @click="goodsSelect()">导入商品
                </el-button>
              </template>
              <template slot="menu" slot-scope="scope">
                <el-button icon="el-icon-delete"
                           size="small"
                           type="text"
                           @click="deleteGoods(scope.row,scope.index)">删除
                </el-button>
              </template>
              <template slot="coverImg" slot-scope="scope">
                <el-image :src="scope.row.coverImg"></el-image>
              </template>
              <template slot="price" slot-scope="scope">
                {{scope.row.priceType == 1 ? scope.row.price/100 : scope.row.priceType == 2 ? scope.row.price/100+'~'+scope.row.price2/100 : scope.row.priceType == 3 ? scope.row.price2/100 : ''}}
              </template>
            </avue-crud>
          </el-dialog>
          <el-dialog
            title="选择商品"
            :visible.sync="dialogGoodsSelect"
            width="60%">
            <avue-crud ref="crud3"
                       v-model="form3"
                       :page.sync="page3"
                       :data="tableData3"
                       :table-loading="tableLoading3"
                       :option="tableOption3"
                       @selection-change="selectionChange"
                       @on-load="getPage3">
              <template slot="coverImgUrl" slot-scope="scope">
                <el-image :src="scope.row.coverImgUrl"></el-image>
              </template>
              <template slot="price" slot-scope="scope">
                {{scope.row.priceType == 1 ? scope.row.price : scope.row.priceType == 2 ? scope.row.price+'~'+scope.row.price2 : scope.row.priceType == 3 ? scope.row.price2 : ''}}
              </template>
            </avue-crud>
            <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogGoodsSelect = false">取 消</el-button>
                  <el-button type="primary" @click="addGoods">确认导入</el-button>
                </span>
          </el-dialog>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
  import { getPage, getObj, addObj, putObj, delObj, getSharedCode, getPushUrl, addGoods, deleteGoods} from '@/api/wxma/wxlive'
  import { getList as getWxAppList } from '@/api/wxmp/wxapp'
  import { tableOption, tableOptionGoods} from '@/const/crud/wxma/wxlive'
  import { tableOption2 as tableOption3 } from '@/const/crud/wxma/wxlivegoods'
  import { mapGetters } from 'vuex'
  import store from "@/store"
  import { getPage as getPage3} from '@/api/wxma/wxlivegoods'

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
        dialogGoods: false,
        form2: {},
        page2: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
          ascs: [],
          descs: 'create_time'
        },
        tableLoading2: false,
        tableData2: [],
        tableOptionGoods: tableOptionGoods,
        roomId: null,
        dialogGoodsSelect: false,
        form3: {},
        page3: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
          ascs: [],
          descs: 'create_time'
        },
        tableLoading3: false,
        tableData3: [],
        tableOption3: tableOption3,
        selectionData: []
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    created() {
      this.getWxAppList()
    },
    mounted: function() { },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.permissions['wxma:wxmalive:add'] ? true : false,
          delBtn: this.permissions['wxma:wxmalive:del'] ? true : false,
          editBtn: this.permissions['wxma:wxmalive:edit'] ? true : false,
          viewBtn: this.permissions['wxma:wxmalive:get'] ? true : false
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
      getSharedCode(row, index){
        this.tableLoading = true
        getSharedCode(this.appId, row.roomId)
          .then(response => {
          let data = response.data.data
          this.$alert(
            '<el-card class="box-card">' +
            '  <div slot="header" class="clearfix">' +
            '    <span>直播间小程序码</span>' +
            '  </div>' +
            '  <div class="text item">' +
            '    <img src="'+data.cdnUrl+'" style="width: 200px;height: 200px">'+
            '  </div>' +
            '</el-card>' +
            '<el-card class="box-card">' +
            '  <div slot="header" class="clearfix">' +
            '    <span>直播间分享海报</span>' +
            '  </div>' +
            '  <div class="text item">' +
            '    <img src="'+data.posterUrl+'" style="width: 200px;height: 260px">'+
            '  </div>' +
            '</el-card>',
            '分享二维码',
            {dangerouslyUseHTMLString: true}
          );
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      getPushUrl(row, index){
        this.tableLoading = true
        getPushUrl(this.appId, row.roomId)
          .then(response => {
            let data = response.data.data
            this.$alert('<textarea rows="6" style="width: 100%">'+data+'</textarea>', '推流地址', {
              dangerouslyUseHTMLString: true
            });
            this.tableLoading = false
          }).catch(() => {
          this.tableLoading = false
        })
      },
      uploadCoverImgSuccess(response, file, fileList){
        if(response.code != 0){
          this.$message({
            showClose: true,
            message: '上传'+response.msg,
            type: 'error'
          })
        }else{
          this.form.coverImg = response.data.mediaId
        }
      },
      uploadShareImgSuccess(response, file, fileList){
        if(response.code != 0){
          this.$message({
            showClose: true,
            message: '上传'+response.msg,
            type: 'error'
          })
        }else{
          this.form.shareImg = response.data.mediaId
        }
      },
      uploadFeedsImgSuccess(response, file, fileList){
        if(response.code != 0){
          this.$message({
            showClose: true,
            message: '上传'+response.msg,
            type: 'error'
          })
        }else{
          this.form.feedsImg = response.data.mediaId
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
      getPage(page, params) {
        if(this.appId){
          this.tableLoading = true
          getPage(Object.assign({
            current: page.currentPage,
            size: page.pageSize,
            descs: this.page.descs,
            ascs: this.page.ascs,
            appType: '1',
            appId: this.appId
          }, params, this.paramsSearch)).then(response => {
            let roomInfos = response.data.data.roomInfos
            roomInfos.forEach(item =>{
              item.startTime = item.startTime*1000
              item.endTime = item.endTime*1000
            })
            this.tableData = roomInfos
            this.page.total = response.data.data.total
            this.page.currentPage = page.currentPage
            this.page.pageSize = page.pageSize
            this.tableLoading = false

            if(this.roomId){
              roomInfos.forEach(item =>{
                if (item.roomId === this.roomId) {
                  this.tableData2 = item.goods
                }
              })
            }
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
          return delObj(_this.appId, row.roomId)
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
        row.startTime = row.startTime/1000
        row.endTime = row.endTime/1000
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
        row.startTime = row.startTime/1000
        row.endTime = row.endTime/1000
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
      refreshChange(page) {
        this.getPage(this.page)
      },
      viewGoods(row, index){
        this.dialogGoods = true
        this.roomId = row.roomId
        this.tableData2 = row.goods
      },
      deleteGoods(row, index){
        var _this = this
        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          _this.tableLoading2 = true
          return deleteGoods({
            appId: _this.appId,
            roomId: _this.roomId,
            goodsId: row.goodsId
          })
        }).then(data => {
          _this.tableLoading2 = false
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          _this.tableData2.splice(index,1)
        }).catch(function(err) {
          _this.tableLoading2 = false
        })
      },
      goodsSelect(){
        this.dialogGoodsSelect = true
      },
      getPage3(page, params) {
        if(this.appId){
          this.tableLoading3 = true
          getPage3(Object.assign({
            current: page.currentPage,
            size: page.pageSize,
            descs: this.page3.descs,
            ascs: this.page3.ascs,
            appId: this.appId,
            status: '2'
          }, params)).then(response => {
            let goods = response.data.data.goods
            this.tableData3 = goods
            this.page3.total = response.data.data.total
            this.page3.currentPage = page.currentPage
            this.page3.pageSize = page.pageSize
            this.tableLoading3 = false
          }).catch(() => {
            this.tableLoading3 = false
          })
        }
      },
      selectionChange(list){
        this.selectionData = list
      },
      addGoods(){
        if(this.selectionData.length<=0){
          this.$message.error('请选择商品')
          return
        }
        let selectionIds = []
        this.selectionData.forEach(item => {
          selectionIds.push(item.goodsId)
        })
        this.tableLoading3 = true
        addGoods({
          appId: this.appId,
          roomId: this.roomId,
          goodsIds: selectionIds
        }).then(data => {
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
          this.tableLoading3 = false
          this.dialogGoodsSelect = false
          this.getPage(this.page)
        }).catch(() => {
          this.tableLoading3 = false
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
