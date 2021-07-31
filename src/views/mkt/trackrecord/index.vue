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
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        v-model="form"
        @on-load="getPage"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="handleDel"
        @sort-change="sortChange"
        @search-change="searchChange"
      >
        <template slot="urls" slot-scope="scope">
          <!--<el-image-->
          <!--style="width: 100px; height: 100px"-->
          <!--:src="scope.row.picUrls[0]"-->
          <!--:preview-src-list="scope.row.picUrls">-->
          <!--</el-image>-->
          <el-image
            v-for="(img, index) in scope.row.urls"
            :key="img"
            :src="img"
            :preview-src-list="getImgList(index, scope.row.urls)"
          ></el-image>
        </template>
        <template slot="urlsForm" slot-scope="scope">
          <div>
            <MaterialList
              v-model="scope.row.urls"
              type="image"
              :num="3"
            ></MaterialList>
          </div>
        </template>
        <template slot="auditStatus" slot-scope="scope">
          <div v-if="scope.row.auditStatus === '0'">
            <br />
            <el-button
              size="mini"
              type="primary"
              @click="reply(scope.row, scope.index)"
              >审核</el-button
            >
          </div>
          <div v-if="scope.row.auditStatus !== '0'">
            <div>{{ scope.row.auditStatus === "1" ? "已通过" : "未通过" }}</div>
            <br />
            <!-- <div v-if="scope.row.listTopicReply.length > 0">
                    <div style="color:red" class="el-icon-chat-dot-round"> 官方回复：</div><div class="time">{{scope.row.listTopicReply[0].createTime}}</div>
                    <div>{{scope.row.listTopicReply[0].details}} <el-button type="warning" icon="el-icon-edit" circle size="mini" @click="showDialogOfficialReply(scope.row,scope.index)"></el-button></div>
                  </div>
                  <div v-if="scope.row.listTopicReply.length <= 0">
                    <el-button size="mini" type="info" @click="showDialogOfficialReply(scope.row,scope.index)">官方回复</el-button>
                  </div> -->
          </div>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { getPage, getObj, addObj, putObj, delObj } from "@/api/mkt/trackrecord";
import { tableOption } from "@/const/crud/mkt/trackrecord";
import { mapGetters } from "vuex";
import MaterialList from "@/components/material/list.vue";

export default {
  components: {
    MaterialList,
  },
  name: "trackrecord",
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
    };
  },
  created() {},
  mounted: function () {},
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.permissions["mkt:trackrecord:add"] ? true : false,
        delBtn: this.permissions["mkt:trackrecord:del"] ? true : false,
        editBtn: this.permissions["mkt:trackrecord:edit"] ? true : false,
        viewBtn: this.permissions["mkt:trackrecord:get"] ? true : false,
      };
    },
  },
  methods: {
    reply(row, index) {
      this.$refs.crud.rowEdit(row, index);
    },
    getImgList(index, picUrls) {
      let arr = [];
      let i = 0;
      for (i; i < picUrls.length; i++) {
        arr.push(picUrls[i + index]);
        if (i + index >= picUrls.length - 1) {
          index = 0 - (i + 1);
        }
      }
      return arr;
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
      if (val.order == "ascending") {
        this.page.descs = [];
        this.page.ascs = prop;
      } else if (val.order == "descending") {
        this.page.ascs = [];
        this.page.descs = prop;
      } else {
        this.page.ascs = [];
        this.page.descs = [];
      }
      this.getPage(this.page);
    },
    getPage(page, params) {
      this.tableLoading = true;
      getPage(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            descs: this.page.descs,
            ascs: this.page.ascs,
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
  },
};
</script>

<style lang="scss" scoped>
</style>
