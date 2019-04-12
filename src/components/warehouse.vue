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
      <el-table-column label="仓库编号" prop="warehouseId" align="center"></el-table-column>
      <el-table-column label="仓库名称" prop="warehouseName" align="center"></el-table-column>
      <el-table-column prop="warehouseType" align="center">
        <template slot="header" slot-scope="scope">
          仓库类型
          <el-tooltip class="item" effect="dark" content="1：服饰；2：鞋履" placement="top">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="input1" size="small" placeholder="输入仓库编号搜索" @keyup.enter.native="find"/>
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
        <el-form-item label="仓库编号：" prop="warehouseId" >
          <el-input v-model="create.warehouseId" ></el-input>
        </el-form-item>
        <el-form-item label="仓库名称：" prop="warehouseName">
          <el-input v-model="create.warehouseName"></el-input>
        </el-form-item>
        <el-form-item label="仓库类型：" prop="warehouseType">
          <el-input v-model="create.warehouseType" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="info" @click="submitForm('create')" >确 定</el-button>
        <el-button @click="dialogCreateVisible = false" >取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改订单 -->
    <el-dialog
      title="修改仓库信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="400px"
    >
      <el-form :model="update" :rules="updateRules" ref="update" label-width="100px">
        <el-form-item label="仓库编号:" prop="warehouseId">
          <el-input v-model="update.warehouseId" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="仓库名字" prop="warehouseName">
          <el-input v-model="update.warehouseName"></el-input>
        </el-form-item>
        <el-form-item label="仓库类型" prop="warehouseType">
          <el-input v-model="update.warehouseType"></el-input>
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
  export default {
    name: "Warehouse",
    inject:['reload'],
    methods: {
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.check();
          } else {
            console.log('新建失败');
            return false;
          }
        });
      },
      check() {
        let warehouseId = this.create.warehouseId;
        //调用数据库findOne接口查找仓库编号信息
        this.$ajax.post('http://localhost:8080/warehouse/findOne/' + warehouseId,).then(response=> {
          console.log(response.data);
          //仓库不存在，新建
          if(response.data === '' || response.data === null) {
            this.createStorage();
          }
          else {
            this.$message.error("该仓库已存在");
            return false;
          }
        }).catch(function (error){
          console.log("新建失败")
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

      //查找数据
      find() {
        if(this.input1===''){
          return;
        }
        console.log(this.input1);
        this.$ajax
        //-------------------------后台接口修改------------------------//
          .post("http://localhost:8080/warehouse/findOne/" + this.input1)
          .then(response => {
            if(response.data===''){
              this.Storage=[];
              return;
            }
            this.Storage=[];
            this.Storage.push(response.data);
          })
          .catch(function(error) {
            console.log("found failed！");
          });
      },

      // 插入数据
      createStorage() {
        let data = this.create;
        console.log(data);
        console.log(JSON.stringify(data));
        this.$ajax
          .post(
            //-------------------------后台接口修改------------------------//
            "http://localhost:8080/warehouse/add/",
            JSON.stringify(data),
            {
              headers: { "Content-Type": "application/json;charset=UTF-8" }
            }
          )
          .then(response => {
            console.log(response.data);
            this.dialogCreateVisible = false;
            this.open2();
          })
          .catch(function(error) {
            console.log("save failed！");
          });
      },
      setCurrent(currentStorage) {
        console.log(currentStorage);
        this.update.warehouseId = currentStorage.warehouseId;
        this.update.warehouseName = currentStorage.warehouseName;
        this.update.warehouseType = currentStorage.warehouseType;
        this.update.sum_money = currentStorage.sum_money;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },

      //更新数据
      updateStorage() {
        let data = {
          warehouseId: this.update.warehouseId,
          warehouseName: this.update.warehouseName,
          warehouseType: this.update.warehouseType
        };
        console.log(data);
        console.log(JSON.stringify(data));
        this.$ajax
          .post(
            //--------------------------后台接口修改----------------------------//
            "http://localhost:8080/warehouse/updateOne/",
            JSON.stringify(data),
            {
              headers: { "Content-Type": "application/json;charset=UTF-8" }
            }
          )
          .then(response => {
            console.log(response);
            this.open3();
            this.reload();
            this.dialogUpdateVisible = false;
          })
          .catch(function(error) {
            console.log("update failed！");
          });
      },

      //删除数据
      removed(currentStorage) {
        console.log("删除订单");
        this.$confirm(
          "此操作将永久删除仓库信息 " + currentStorage.warehouseId + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        )
          .then(() => {
            //向请求服务端删除
            this.$ajax
              .post(
                //--------------------------后台接口修改-------------------------//
                "http://localhost:8080/warehouse/delete/" +
                currentStorage.warehouseId
              )
              .then(response => {
                console.log(response);
                if (response.data === 1) {
                  this.open1();
                }
              })
              .catch(function(error) {
                console.log("delete failed！");
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
      // 加载数据
      console.log("loading data.");
      this.$ajax({
        method: "get",
        //------------------------后台接口修改-----------------------------//
        url: "http://localhost:8080/warehouse/findAll"
      }).then(response => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.Storage.push(response.data[i]);
        }
      });
    },

    data() {
      return {
        dialogCreateVisible: false,
        dialogUpdateVisible: false,
        word: "", // 搜索框的值
        create: {
          warehouseId: "",
          warehouseName: "",
          warehouseType: ""
        },

        createRules: {
          warehouseId: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          warehouseName: [
            {required: true, message: '请输入仓库名称', trigger: 'blur'}
          ],
          warehouseType: [
            {required: true, message: '请输入仓库类型', trigger: 'blur'},
            { min: 1, max: 1, message: '输入1～2', trigger: 'blur' }
          ]
        },
        update: {
          warehouseId: "",
          warehouseName: "",
          warehouseType: "",
          sum_money: ""
        },

        updateRules: {
          warehouseId: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          warehouseName: [
            {required: true, message: '请输入仓库名称', trigger: 'blur'}
          ],
          warehouseType: [
            {required: true, message: '请输入仓库类型', trigger: 'blur'},
            { min: 1, max: 1, message: '输入1～2', trigger: 'blur' }
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
  //border-bottom: 2px #409eff solid;
    font-size: 35px;
    padding-bottom: 10px;
  }

</style>
