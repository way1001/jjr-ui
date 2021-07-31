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
        <template slot="menuLeft">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="onFileChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              ><i class="el-icon-upload el-icon--left"></i>上传客户</el-button
            >
            <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
          </el-upload>
        </template>
        <template slot="menuRight">
          <el-button plain type="success" icon="el-icon-download" size="small"
            ><el-link
              target="_blank"
              href="https://image.kehuoa.com/%E5%AE%A2%E6%88%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx"
              >模版下载</el-link
            ></el-button
          >
          <!-- <el-link type="success" plain icon="el-icon-download"
                >模版下载</el-link
              > -->
          <!-- <el-link type="success" plain target="_blank" href="https://image.kehuoa.com/%E6%88%BF%E6%BA%90%E6%A8%A1%E7%89%88.xlsx">模版下载<i class="el-icon-download el-icon--right"></i></el-link> -->
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { getPage, getObj, addObj, putObj, delObj, postList } from "@/api/mkt/referrals";
import { tableOption } from "@/const/crud/mkt/referrals";
import { mapGetters } from "vuex";
import XLSX from "xlsx";

export default {
  name: "referrals",
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
      fileList: [],
      rows: [],
      cellBtn: false,
    };
  },
  created() {},
  mounted: function () {},
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.permissions["mkt:referrals:add"] ? true : false,
        delBtn: this.permissions["mkt:referrals:del"] ? true : false,
        editBtn: this.permissions["mkt:referrals:edit"] ? true : false,
        viewBtn: this.permissions["mkt:referrals:get"] ? true : false,
      };
    },
  },
  methods: {
      rowCell(row, index) {
      this.$refs.crud.rowCell(row, index);
    },
    rowUpdate(form, index, done) {
      this.$message.success(
        "编辑数据" + JSON.stringify(form) + "数据序号" + index
      );
      done();
    },
    handleRowClick(row, event, column) {
      this.$message({
        showClose: true,
        message: "序号" + row.$index,
        type: "success",
      });
    },
    submitUpload() {
      // this.$refs.upload.submit();
      if (this.rows.length > 0) {
        this.rows.forEach((element) => {
          element.tenantId = this.tenantId;
        });
      }
      postList(this.rows)
        .then((response) => {
          let data = response.data.data;
          // this.treeAffiliationData = data;
          // if (data && data.length > 0) {
          //   this.nodeClick(data[0]);
          // }

          this.getPage(this.page);
        })
        .catch(() => {});
    },
    onFileChange(file, fileList) {
      // console.log(file, fileList);
      /* wire up file reader */
      if (fileList.length !== 1 || file == null) {
        throw new Error("Cannot use multiple files");
      }
      var reader = new window.FileReader();
      reader.onload = (e) => {
        /* read workbook */
        var bstr = e.target.result;
        var wb = XLSX.read(bstr, { type: "binary" });

        /* grab first sheet */
        var wsname = wb.SheetNames[0];
        var ws = wb.Sheets[wsname];
        this.delete_row(ws, 0);
        /* save data */
        this.rows = XLSX.utils.sheet_to_json(ws, {
          header: [
            // "tenantId",
            // "affiliationId",
            "phone",
            "customerName",
            "gender",
            "description",
            "workflowStatus",
            "commonPool"
            
          ],
          defval: null,
        });
      };
      reader.readAsBinaryString(fileList[0].raw);
    },
    delete_row(ws, row_index) {
      const variable = XLSX.utils.decode_range(ws["!ref"]);
      for (let R = row_index; R < variable.e.r; ++R) {
        for (let C = variable.s.c; C <= variable.e.c; ++C) {
          ws[this.ec(R, C)] = ws[this.ec(R + 1, C)];
        }
      }
      variable.e.r--;
      ws["!ref"] = XLSX.utils.encode_range(variable.s, variable.e);
    },
    ec(r, c) {
      return XLSX.utils.encode_cell({ r: r, c: c });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
            commonPool: '1',
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
