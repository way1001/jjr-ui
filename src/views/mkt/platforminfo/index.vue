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
      <el-button @click="handle">{{ title }}</el-button>
      <avue-form :option="option" v-model="obj" @submit="submit">
        <template slot="regionsType">
          <div class="box-card el-card" style="margin-bottom: 5px">
            <div class="el-card__body" style="padding: 5px 20px">
              <el-tag
                v-for="(item, index) in obj.regionsType"
                :key="index"
                type="info"
                size="small"
                closable
                @close="delRegionsType(index)"
              >
                {{ item }}
              </el-tag>
              <br />
              <el-popover placement="bottom" width="200" trigger="click">
                <el-input
                  placeholder="请输入区域类目"
                  v-model="rt"
                  :disabled="disabled"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    size="small"
                    @click="addRegionsType"
                  ></el-button>
                </el-input>
                <el-button slot="reference" type="text" style="margin-left: 5px"
                  >添加区域类目
                  <span style="color: #cfcfcf; font-size: 12px"
                    >(类目仅需填写大类，如西区、城中、城北等)</span
                  >
                </el-button>
              </el-popover>
            </div>
          </div>
        </template>
      </avue-form>
    </basic-container>
  </div>
</template>

<script>
import { addObj, putObj, getObj2 } from "@/api/mkt/platforminfo";
import { mapGetters } from "vuex";

export default {
  name: "platforminfo",
  data() {
    return {
      obj: {
        platformProvince: "",
        platformCity: "",
        platformCountry: "",
      },
      rt: "",
      disabled: false,
      isAnomaly: 1,
      option: {
        detail: true,
        group: [
          {
            label: "平台信息",
            prop: "ptxx",
            icon: "el-icon-edit-outline",
            column: [
              {
                label: "平台名称",
                labelWidth: 200,
                prop: "platformName",
                span: 24,
                rules: [
                  {
                    required: true,
                    message: "请输入平台名称",
                    trigger: "blur",
                  },
                  {
                    max: 60,
                    message: "长度在不能超过60个字符",
                  },
                ],
              },
              {
                label: "负责人",
                labelWidth: 200,
                prop: "principal",
              },
              {
                label: "平台电话",
                labelWidth: 200,
                prop: "platformPhone",
              },
              {
                label: "省份",
                prop: "platformProvince",
                type: "select",
                labelWidth: 200,
                props: {
                  label: "name",
                  value: "code",
                },
                cascaderItem: ["platformCity", "platformCountry"],
                dicUrl: `/mkt/platforminfo/getProvince`,
                dicFormatter: (res) => {
                  return res.data; //返回字典的层级结构
                },
                rules: [
                  {
                    required: true,
                    message: "请选择省份",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "城市",
                prop: "platformCity",
                type: "select",
                labelWidth: 200,
                props: {
                  label: "name",
                  value: "code",
                },
                row: true,
                cascaderIndex: 0,
                dicUrl: `/mkt/platforminfo/getCity/{{key}}?province={{platformProvince}} `,
                // dicQuery:{
                //   city:'{{key}}',
                //   province:'{{province}}'
                // },
                rules: [
                  {
                    required: true,
                    message: "请选择城市",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "地区",
                prop: "platformCountry",
                type: "select",
                labelWidth: 200,
                props: {
                  label: "name",
                  value: "code",
                },
                cascaderIndex: 0,
                dicUrl: `/mkt/platforminfo/getArea/{{key}}?city={{platformProvince}} `,
                rules: [
                  {
                    required: false,
                    message: "请选择地区",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "隐藏位数",
                labelWidth: 200,
                prop: "suppressionNumber",
                type: "select",
                search: true,
                dicData: [
                  {
                    label: "隐藏5、6位",
                    value: "2",
                  },
                  {
                    label: "隐藏4、5、6位",
                    value: "3",
                  },
                  {
                    label: "隐藏5、6、7位",
                    value: "4",
                  },
                  {
                    label: "隐藏4、5、6、7位",
                    value: "5",
                  },
                ],
              },
              {
                label: "区域",
                labelWidth: 200,
                dataType: "array",
                span: 16,
                prop: "regionsType",
                formslot: true,
              },
              {
                label: "平台H5链接",
                labelWidth: 200,
                span: 16,
                prop: "platformUrl",
              },
              {
                label: "平台免责声明",
                prop: "disclaimer",
                type: "textarea",
                labelWidth: 200,
                minRows: 10,
                maxlength: 5000,
                span: 24,
              },

              {
                label: "平台注册协议",
                prop: "registrationProtocol",
                type: "textarea",
                labelWidth: 200,
                minRows: 10,
                maxlength: 5000,
                span: 24,
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
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: !!this.permissions["estate:platforminfo:add"],
        delBtn: !!this.permissions["estate:platforminfo:del"],
        editBtn: !!this.permissions["estate:platforminfo:edit"],
        viewBtn: !!this.permissions["estate:platforminfo:get"],
      };
    },
    title() {
      return this.option.detail ? "编 辑" : "保 存";
    },
  },
  methods: {
    addRegionsType() {
      if (!this.obj.regionsType) {
        this.obj.regionsType = [];
      }
      if (this.obj.regionsType.length <= 10) {
        this.obj.regionsType.push(this.rt);
      }
      // this.disabled = true
    },
    delRegionsType(index) {
      this.obj.regionsType.splice(index, 1);
    },
    handle() {
      if (this.isAnomaly === 0) {
        this.option.detail = !this.option.detail;
      }
    },
    submit(form, done) {
      // this.$message.success(JSON.stringify(this.obj))
      putObj(this.obj)
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
      getObj2().then((response) => {
        if (response.data.ok === true) {
          this.obj = response.data.data ? response.data.data : {};
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
  },
};
</script>

<style lang="scss" scoped>
</style>
