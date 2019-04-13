<template>
  <div class="Warehouse">
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="24" align="center">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span><b>仓库信息</b></span>
      </el-col>
      <div style="margin-top: 40px;">
        <el-col :span="24" align="left">
          <el-button type="info" size="small" @click="dialogCreateVisible = true">添加仓库信息</el-button>
        </el-col>
      </div>
    </el-row>

    <br>

    <!-- 仓库汇总 -->
    <el-table :data="Storage" style="width: 100%">
      <el-table-column label="仓库编号" prop="warehouseid" align="center"></el-table-column>
      <el-table-column label="仓库名称" prop="warehousename" align="center"></el-table-column>
      <el-table-column prop="warehousetype" align="center">
        <template slot="header" slot-scope="scope">
          仓库类型
          <el-tooltip class="item" effect="dark" content="1：服饰；2：鞋履" placement="top">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="input1" size="small" placeholder="输入仓库编号搜索" @keyup.enter.native="selectByKeyword"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="setCurrent(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removed(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新建仓库 -->
    <el-dialog title="添加新仓库" :visible.sync="dialogCreateVisible" width="400px">
      <el-form :model="create" :rules="createRules" ref="create" label-width="100px">
        <el-form-item label="仓库编号：" prop="warehouseid">
          <el-input v-model="create.warehouseId"></el-input>
        </el-form-item>
        <el-form-item label="仓库名称：" prop="warehousename">
          <el-input v-model="create.warehouseName"></el-input>
        </el-form-item>
        <el-form-item label="仓库类型：" prop="warehousetype">
          <el-input v-model="create.warehouseType"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="info" @click="submitForm('create')">确 定</el-button>
        <el-button @click="dialogCreateVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改仓库 -->
    <el-dialog
      title="修改仓库信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="400px"
    >
      <el-form :model="update" :rules="updateRules" ref="update" label-width="100px">
        <el-form-item label="仓库编号:" prop="warehouseid">
          <el-input v-model="update.warehouseid" disabled></el-input>
        </el-form-item>
        <el-form-item label="仓库名字" prop="warehousename">
          <el-input v-model="update.warehousename"></el-input>
        </el-form-item>
        <el-form-item label="仓库类型" prop="warehousetype">
          <el-input v-model="update.warehousetype"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm2('update')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {AjaxHelper} from "../../static/js/AjaxHelper";

  export default {
    name: "Warehouse",
    inject: ['reload'],
    methods: {
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.createStorage();
          } else {
            console.log('新建失败');
            return false;
          }
        });
      },
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateStorage();
          } else {
            console.log('新建失败');
            return false;
          }
        });
      },

      //通过关键字查找数据查找数据
      selectByKeyword() {
        if (this.input1 === '') {
          return;
        }
        console.log(this.input1);
        AjaxHelper.get("http://localhost:8081/warehouse/retrieval",{keyword:this.input1},(jsonResult)=>{
          if(jsonResult.status==1){
            console.log(jsonResult.msg);
            var list = jsonResult.data.list;
            this.Storage = [];
            list.forEach(item => {
              this.Storage.push(item);
            });
          }else{
            this.$message.info(jsonResult.msg);
          }
        })
      },

      // 插入数据
      createStorage() {
        let data = this.create;
        console.log(data);
        console.log(AjaxHelper);
        AjaxHelper.post("http://localhost:8081/warehouse/add",data,(jsonResult)=>{
          if(jsonResult.status==1){
            this.$message.info("新建仓库成功");
            this.$router.go(0);
          }else{
            this.$message.info(jsonResult.msg);
          }
        })
      },
      setCurrent(currentStorage) {
        console.log(currentStorage);
        this.update.warehouseid = currentStorage.warehouseid;
        this.update.warehousename = currentStorage.warehousename;
        this.update.warehousetype = currentStorage.warehousetype;
        this.update.sum_money = currentStorage.sum_money;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },

      //更新数据
      updateStorage() {
        let data = {
          warehouseId: this.update.warehouseid,
          warehouseName: this.update.warehousename,
          warehouseType: this.update.warehousetype
        };
        AjaxHelper.post("http://localhost:8081/warehouse/update", data, (jsonResult) => {
          console.log(jsonResult);
          if (jsonResult.status == 1) {
            this.$message({
              message: "成功",
              type: "success"
            });
            this.dialogUpdateVisible = false;
            setTimeout(500, this.$router.go(0));
          }
        })
      },

      //删除数据
      removed(currentStorage) {
        console.log("删除订单");
        this.$confirm(
          "此操作将永久删除仓库信息 " + currentStorage.warehouseid + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        )
          .then(() => {

            AjaxHelper.get("http://localhost:8081/warehouse/delete", {warehouseId:currentStorage.warehouseid}, (data) => {
              if(data.status==1){
                this.$message.info("删除成功!");
                this.$router.go(0);
              }else {
                this.$message.info(data.msg);
              }
            });

          })
          .catch(() => {
            this.$message.info("已取消操作!");
          });
      },
      open1() {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.reload();
      },
      open2() {
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.reload();
      },
      open3() {
        this.$message({
          message: "修改成功",
          type: "success"
        });
      },
    },

    mounted() {
      console.log("loading data.");
      console.log(JSON.stringify({pageNum: 1}));
      AjaxHelper.get("http://localhost:8081/warehouse/selectAll", {pageNum: 1, pageSize: 10}, (data) => {
        console.log(data);
        var list = data.list;
        list.forEach(item => {
          this.Storage.push(item);
        });
      })
    },

    data() {
      return {
        dialogCreateVisible: false,
        dialogUpdateVisible: false,
        word: "", // 搜索框的值
        create: {
          warehouseid: "",
          warehousename: "",
          warehousetype: ""
        },

        createRules: {
          warehouseid: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          warehousename: [
            {required: true, message: '请输入仓库名称', trigger: 'blur'}
          ],
          warehousetype: [
            {required: true, message: '请输入仓库类型', trigger: 'blur'},
            {min: 1, max: 10, message: '输入1～10', trigger: 'blur'}
          ]
        },
        update: {
          warehouseid: "",
          warehousename: "",
          warehousetype: "",
          sum_money: ""
        },

        updateRules: {
          warehouseid: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          warehousename: [
            {required: true, message: '请输入仓库名称', trigger: 'blur'}
          ],
          warehousetype: [
            {required: true, message: '请输入仓库类型', trigger: 'blur'},
            {min: 1, max: 10, message: '输入1～10', trigger: 'blur'}
          ]
        },
        Storage: [],
        input1: ""
      };
    }
  }
</script>

<style scoped>
  .orderTitle {
  / / border-bottom: 2 px #409eff solid;
    font-size: 35px;
    padding-bottom: 10px;
  }

</style>
