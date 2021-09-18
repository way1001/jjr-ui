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
      <el-button @click="handle" style="margin-left: 20px">{{
        title
      }}</el-button>
      <avue-form ref="form" :option="option" v-model="form" @submit="submit">
        <template slot="startTime" slot-scope="scope">
          <avue-date
            v-model="form.startTime"
            type="datetime"
            format="yyyy年MM月dd日 hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="请选择日期"
          ></avue-date>
        </template>
        <template slot="endTime" slot-scope="scope">
          <avue-date
            v-model="form.endTime"
            type="datetime"
            format="yyyy年MM月dd日 hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="请选择日期"
          ></avue-date>
        </template>
        <template slot="picUrls" slot-scope="scope">
          <MaterialList
            v-model="form.picUrls"
            type="image"
            :num="1"
            :width="200"
            :height="400"
          ></MaterialList>
        </template>
      </avue-form>
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
  getObj2,
} from "@/api/mkt/popupads";
import MaterialList from "@/components/material/list.vue";
import { mapGetters } from "vuex";

export default {
  name: "popupads",
  components: {
    MaterialList,
  },
  data() {
    return {
      form: {},
      isAnomaly: 1,
      option: {
        detail: true,
        group: [
          {
            label: "弹窗广告信息",
            prop: "jbxx",
            icon: "el-icon-edit-outline",
            column: [
              {
                label: "图片（建议尺寸800*1600）",
                prop: "picUrls",
                dataType: "array",
                labelWidth: 120,
                span: 16,
                slot: true,
                formslot: true,
              },
              {
                label: "弹窗链接",
                prop: "advLink",
                labelWidth: 120,
                span: 24,
                rules: [
                  {
                    max: 128,
                    message: "长度在不能超过128个字符",
                  },
                ],
              },
              {
                label: "开始时间",
                prop: "startTime",
                labelWidth: 120,
                span: 12,
                formslot: true,
              },
              {
                label: "结束时间",
                prop: "endTime",
                labelWidth: 120,
                span: 12,
                formslot: true,
              },
              {
                label: "自动隐藏",
                prop: "autohide",
                type: "radio",
                labelWidth: 120,
                span: 12,
                rules: [
                  {
                    required: true,
                    message: "是否自动隐藏",
                    trigger: "blur",
                  },
                ],
                dicData: [
                  {
                    label: "自动",
                    value: "0",
                  },
                  {
                    label: "否",
                    value: "1",
                  },
                ],
              },
              {
                label: "隐藏时间",
                prop: "timeWrap",
                labelWidth: 120,
                span: 12,
              },
              {
                label: "启用",
                prop: "enable",
                type: "radio",
                labelWidth: 120,
                span: 24,
                rules: [
                  {
                    required: true,
                    message: "是否启用",
                    trigger: "blur",
                  },
                ],
                dicData: [
                  {
                    label: "关闭",
                    value: "0",
                  },
                  {
                    label: "开启",
                    value: "1",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.handleGet();
  },
  mounted: function () {
    // setTimeout(() => {
    //   this.form = {
    //     autohide: '0',
    //     timeWrap: '5',
    //     enable: '1',
    //   }
    // }, 100)
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.permissions["mkt:popupads:add"] ? true : false,
        delBtn: this.permissions["mkt:popupads:del"] ? true : false,
        editBtn: this.permissions["mkt:popupads:edit"] ? true : false,
        viewBtn: this.permissions["mkt:popupads:get"] ? true : false,
      };
    },
    title() {
      return this.option.detail ? "编 辑" : "退出编辑";
    },
  },
  methods: {
    handle() {
      if (this.isAnomaly === 0) {
        this.option.detail = !this.option.detail;
      }
    },
    submit(form, done) {
      // this.$message.success(JSON.stringify(this.obj))
      form.picUrls = form.picUrls[0];
      putObj(form)
        .then((response) => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          // this.getPage(this.page)
          this.option.detail = true;
          done();
        })
        .catch(() => {});
    },
    handleGet: function () {
      // getObj2().then((response) => {
      //   this.form = response.data.data ? response.data.data : {};
      //   this.form.picUrls = [
      //     response.data.data.picUrls ? response.data.data.picUrls : "",
      //   ];
      // });
      getObj2().then((response) => {
        if (response.data.ok === true) {
          this.form = response.data.data ? response.data.data : {};
          this.form.picUrls = [
            response.data.data.picUrls ? response.data.data.picUrls : "",
          ];
          this.isAnomaly = 0;
        } else {
          this.isAnomaly = 1;
        }
      });
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate(form, done) {
      form.picUrls = form.picUrls[0];
      putObj(form)
        .then((response) => {
          done();
          // this.form = response.data.data
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          this.handleGet();
        })
        .catch(() => {
          done();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
