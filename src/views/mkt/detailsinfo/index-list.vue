<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-row :span="24" :gutter="10">
        <el-col :xs="24" :sm="24" :md="3">
          <el-card shadow="never">
            <div slot="header">
              <span>楼盘名称</span>
            </div>
            <el-input
              placeholder="输入关键字进行过滤"
              size="mini"
              v-model="filterText"
            >
            </el-input>
            <el-tree
              style="margin-top: 5px"
              :data="treeAffiliationData"
              :props="treeAffiliationProps"
              :filter-node-method="filterNode"
              node-key="id"
              default-expand-all
              ref="tree"
              @node-click="nodeClick"
            >
            </el-tree>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" class="user__main">
          <avue-form
            ref="form"
            :option="option"
            v-model="form"
            @submit="handleUpdate"
          >
            <template v-if="showEditor" slot-scope="scope" slot="description">
              <!--<el-row :gutter="20">-->
              <!--<el-col :span="6">-->
              <!--<el-input :rows="3" type="textarea" v-model="form.description" placeholder="内容"></el-input>-->
              <!--</el-col>-->
              <!--<el-col :span="14">-->
              <BaseEditor v-model="form.description" />
              <!--</el-col>-->
              <!--</el-row>-->
            </template>
          </avue-form>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import {
  getObj3,
  putObj,
} from "@/api/mkt/detailsinfo";
import {
  addObj as adddif,
  putBatch,
  delObj as deldif,
} from "@/api/mkt/detailsinfosurrounding";
import { fetchTree, getAll } from "@/api/mkt/basicinfo";
import { mapGetters } from "vuex";
import BaseEditor from "@/components/editor/BaseEditor.vue";

export default {
  name: "detailsinfo",
  components: {
    BaseEditor,
  },
  data() {
    var validatePass = (rule, value, callback)=>  {
      var reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/;
      if (value === '') {
        callback(new Error('请输入 绿化率'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入数字!'));
      } else {
        callback();
      }
    }
    return {
      showEditor: false,
      form: {},
      filterText: "",
      treeAffiliationProps: {
        label: "projectName",
        value: "id",
      },
      idBug: false,
      treeAffiliationData: [],
      option: {
        emptyBtn: false,
        group: [
          {
            label: "详情信息",
            icon: "el-icon-edit-outline",
            prop: "group1",
            column: [
              {
                label: "售楼地址",
                labelWidth: 120,
                prop: "salesAddress",
              },
              {
                label: "建筑类型",
                labelWidth: 120,
                prop: "architecturalTypes",
              },
              {
                label: "装修标准",
                labelWidth: 120,
                prop: "decorationStandard",
              },
              {
                label: "开发商",
                labelWidth: 120,
                prop: "developers",
              },
              {
                label: "容积率",
                labelWidth: 120,
                prop: "plotRatio",
              },
              {
                label: "绿化率（%）",
                labelWidth: 120,
                prop: "greeningRate",
                rules: [
                 { validator: validatePass, trigger: 'blur' }
                ],
              },
              {
                label: "占地面积（㎡）",
                labelWidth: 120,
                prop: "coverArea",
              },
              {
                label: "建筑面积（㎡）",
                labelWidth: 120,
                prop: "floorArea",
              },
              {
                label: "规划用户（人）",
                labelWidth: 120,
                prop: "planningUser",
              },
              {
                label: "车位数",
                labelWidth: 120,
                prop: "parkingNumber",
              },
              {
                label: "车位配比",
                labelWidth: 120,
                prop: "parkingRatio",
              },
              {
                label: "交房日期",
                labelWidth: 120,
                prop: "projectSchedule",
              },
              {
                label: "关联楼盘",
                labelWidth: 120,
                prop: "affiliationId",
                detail: true,
              },
              {
                label: "小程序路径",
                labelWidth: 120,
                prop: "minipath",
                span: 24,
                detail: true,
              },
            ],
          },
          {
            label: "简介信息",
            icon: "el-icon-edit-outline",
            prop: "group2",
            column: [
              {
                label: "描述",
                prop: "description",
                formslot: true,
                span: 24,
              },
            ],
          },
          {
            label: "周边信息",
            icon: "el-icon-view",
            prop: "group3",
            column: [
              {
                label: "周边信息",
                prop: "detailsInfoSurroundingList",
                type: "dynamic",
                span: 24,
                children: {
                  align: "center",
                  headerAlign: "center",
                  rowAdd: (done) => {
                    this.$message.success("新增周边配套信息");
                    // adddif({
                    //   detailsId: this.form.id,
                    // }).then(response => {
                    done({
                      detailsId: this.form.id,
                    });
                    // })
                  },
                  rowDel: (row, done) => {
                    deldif(row.id)
                      .then((res) => {
                        this.$message.success(
                          "删除周边配套信息" + JSON.stringify(row)
                        );
                        done();
                      })
                      .catch(function (err) {
                        done();
                      });
                  },
                  // rowEdit: (row, index, done)=>{
                  //   this.$message.success('修改周边配套信息'+JSON.stringify(row));
                  // },
                  column: [
                    {
                      width: 200,
                      label: "标题",
                      prop: "name",
                      // type: "",
                      // formslot: true,
                    },
                    {
                      label: "内容",
                      prop: "content",
                      type: "textarea",
                    },
                  ],
                },
                // rules: [
                //   {
                //     required: true,
                //     message: '必填项测试',
                //     trigger: 'blur'
                //   }
                // ]
              },
            ],
          },
        ],
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    // setTimeout(()=>{
    //   this.handleGet()
    // },1000)
    this.handleAffiliation();
  },
  mounted: function () {},
  computed: {
    ...mapGetters(["permissions"]),
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.projectName.indexOf(value) !== -1;
    },
    handleAffiliation() {
      getAll()
        .then((response) => {
          let data = response.data.data;
          this.treeAffiliationData = data;
          if (data && data.length > 0) {
            this.nodeClick(data[0]);
          }
        })
        .catch(() => {});
    },
    nodeClick(data) {
      let that = this;
      that.$refs.form.resetForm();
      that.form.affiliationId = data.id;
      that.form.minipath = "pages/index/index?aff=" + data.id + "&sce=meu";
      that.$nextTick(() => {
        that.$refs.tree.setCurrentKey(data.id);
      });
      getObj3(data.id).then((response) => {
        if (!response.data.data) {
          that.form.affiliationId = data.id;
          that.form.minipath = "pages/index/index?aff=" + data.id + "&sce=meu";
          that.form.description = "";
        }


        that.form = response.data.data ? response.data.data : {};
        if (response.data.data == null) {
          that.idBug = true;
        }

        // that.description = that.form.description
        // that.$nextTick(() => {
        that.showEditor = true;
        // })
      });
    },
    /**
     * @title 数据更新
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate(form, done) {
      let surrounding = this.form.detailsInfoSurroundingList;
      putBatch(surrounding).then((res) => {
        console.log(res.data.data);
      });
      delete this.form.tenantId;
      if (this.idBug == true) {
        delete this.form.id;
      }
      putObj(this.form)
        .then((response) => {
          done();
          // this.form = response.data.data
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          this.handleAffiliation();
          location.reload();
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
