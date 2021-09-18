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
            <div style="text-align: center;color: red;margin-bottom: 10px">温馨提示：设置楼盘对应楼盘对接人角色后，推荐首页才会显示对应楼盘！</div>
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
        <template slot="headimgUrl" slot-scope="scope">
          <!-- <img
            style="height: 150px; width: 120px"
            :src="scope.row.headimgUrl"
          /> -->
          <el-avatar
            icon="el-icon-user-solid"
            :src="scope.row.headimgUrl[0]"
          ></el-avatar>
        </template>
        <template slot="headimgUrlForm" slot-scope="scope">
          <MaterialList
            v-model="scope.row.headimgUrl"
            type="image"
            :num="1"
            :width="120"
            :height="150"
          ></MaterialList>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { getPage, getObj, addObj, putObj, delObj } from "@/api/mkt/userinfo";
import { tableOption } from "@/const/crud/mkt/userinfo";
import { mapGetters } from "vuex";
import MaterialList from "@/components/material/list.vue";

export default {
  components: {
    MaterialList,
  },
  name: "userinfo",
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
        addBtn: this.permissions["mkt:userinfo:add"] ? true : false,
        delBtn: this.permissions["mkt:userinfo:del"] ? true : false,
        editBtn: this.permissions["mkt:userinfo:edit"] ? true : false,
        viewBtn: this.permissions["mkt:userinfo:get"] ? true : false,
      };
    },
  },
  methods: {
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
          let tableData = response.data.data.records;
          tableData.forEach((item) => {
            item.headimgUrl = [item.headimgUrl];
          });
          this.tableData = tableData;
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
      row.headimgUrl = row.headimgUrl[0];
      if (!Array.isArray(row.affiliated)) {
        let tmpArray = row.affiliated.split(',');
        row.affiliated = tmpArray;
      }
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
      row.headimgUrl = row.headimgUrl[0] ? row.headimgUrl[0] : "";
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
