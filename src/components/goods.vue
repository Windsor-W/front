<template>
  <div class="Goods">
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="24" align="center">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span><b>物品信息</b></span>
      </el-col>
      <div style="margin-top: 40px;">
        <el-col :span="24" align="left">
          <el-button type="info" size="small" @click="dialogCreateVisible = true">添加物品信息</el-button>
        </el-col>
      </div>
    </el-row>

    <br>

    <!-- 物品汇总 -->
    <el-table :data="production" style="width: 100%">
      <el-table-column label="物品编号" prop="goodsId" align="center"></el-table-column>
      <el-table-column label="物品名称" prop="goodsName" align="center"></el-table-column>
      <el-table-column label="仓库编号" prop="storehouseId" align="center"></el-table-column>
      <el-table-column label="数量" prop="measurementUnits" align="center"></el-table-column>
      <el-table-column label="计量单位" prop="goodsSum" align="center"></el-table-column>
      <el-table-column label="计划单价" prop="predictPrice" align="center"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="input1" size="small" placeholder="输入物品编号搜索" @keyup.enter.native="find"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="setCurrent(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removed(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新建物品 -->
    <el-dialog title="添加新物品" :visible.sync="dialogCreateVisible" width="550px">
      <div align="center">
        <el-form :model="create" :rules="createRules" ref="create" label-width="120px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="物品编号：" prop="goodsId">
                <el-input v-model="create.goodsId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="物品名称：" prop="goodsName">
                <el-input v-model="create.goodsName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="仓库编号：" prop="storehouseId">
                <el-input v-model="create.storehouseId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="数量：" prop="goodsSum">
                <el-input v-model="create.goodsSum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="计量单位：" prop="measurementUnits">
                <el-input v-model="create.measurementUnits"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="计划单价：" prop="predictPrice">
                <el-input v-model="create.predictPrice"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="info" @click="submitForm('create')" >确 定</el-button>
        <el-button @click="dialogCreateVisible = false" >取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改物品信息 -->
    <el-dialog
      title="修改物品信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="400px"
    >
      <el-form :model="update" :rules="updateRules" ref="update" label-width="120px">
        <el-form-item label="物品编号：" prop="goodsId">
          <el-input v-model="update.goodsId" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="物品名称：" prop="goodsName">
          <el-input v-model="update.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="仓库编号：" prop="storehouseId">
          <el-input v-model="update.storehouseId"></el-input>
        </el-form-item>
        <el-form-item label="数量：" prop="goodsSum">
          <el-input v-model="update.goodsSum"></el-input>
        </el-form-item>
        <el-form-item label="计量单位：" prop="measurementUnits">
          <el-input v-model="update.measurementUnits"></el-input>
        </el-form-item>
        <el-form-item label="计划单价：" prop="predictPrice">
          <el-input v-model="update.predictPrice"></el-input>
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
    name: "Goods",
    inject: ["reload"],
    mounted() {
      // 加载数据
      console.log("loading data.");
      this.$ajax({
        method: "get",
        url: "http://localhost:8080/goods/findAll"
      }).then(response => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.production.push(response.data[i]);
        }
      });
    },

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
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateProduction();
          } else {
            console.log('新建失败');
            return false;
          }
        });
      },
      check() {
        let goodsId = this.create.goodsId;
        //调用数据库findOne接口查找仓库编号信息
        this.$ajax.post('http://localhost:8080/goods/findOne/' + goodsId,).then(response=> {
          console.log(response.data);
          //仓库不存在，新建
          if(response.data === '' || response.data === null) {
            this.createProduction();
          }
          else {
            this.$message.error("该物品已存在");
            return false;
          }
        }).catch(function (error){
          console.log("新建失败")
        });
      },
      // 新建订单
      createProduction() {
        let data = this.create;
        console.log(data);
        this.$ajax
          .post("http://localhost:8080/goods/saveOne/", JSON.stringify(data), {
            headers: { "Content-Type": "application/json;charset=UTF-8" }
          })
          .then(response => {
            console.log(response);
            this.dialogCreateVisible = false;
            this.open2();
          })
          .catch(function(error) {
            console.log("save failed！");
          });
      },
      setCurrent(currentProduct) {
        console.log(currentProduct);
        this.update.goodsId = currentProduct.goodsId;
        this.update.goodsName = currentProduct.goodsName;
        this.update.measurementUnits = currentProduct.measurementUnits;
        this.update.storehouseId = currentProduct.storehouseId;
        this.update.predictPrice = currentProduct.predictPrice;
        this.update.goodsSum = currentProduct.goodsSum;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },
      updateProduction() {
        let data = {
          goodsId: this.update.goodsId,
          goodsName: this.update.goodsName,
          measurementUnits: this.update.measurementUnits,
          storehouseId: this.update.storehouseId,
          predictPrice: this.update.predictPrice,
          goodsSum: this.update.goodsSum
        };
        console.log(data);
        console.log(JSON.stringify(data));
        this.$ajax
          .post("http://localhost:8080/goods/updateOne/", JSON.stringify(data), {
            headers: { "Content-Type": "application/json;charset=UTF-8" }
          })
          .then(response => {
            console.log(response);
            this.dialogCreateVisible = false;
            this.open3();
            this.reload();
          })
          .catch(function(error) {
            console.log("update failed！");
          });
      },
      // 删除订单
      removed(currentProduct) {
        console.log("删除物品");
        this.$confirm(
          "此操作将永久删除物品信息 " + currentProduct.goodsId + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        )
          .then(() => {
            console.log("确认删除物品信息");
            // 向请求服务端删除
            let goodsId = currentProduct.goodsId;
            console.log(goodsId);
            this.$ajax
              .get("http://localhost:8080/goods/deleteOne/" + goodsId)
              .then(response => {
                console.log(response);
                if (response.data == "success") {
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
          type: "warning"
        });
      },
      //查询订单
      find() {
        if (this.input1 === '') {return;}
        //let data = this.input1;
        console.log(this.input1);
        this.$ajax
          .post("http://localhost:8080/goods/findOne/" + this.input1)
          .then(response => {
            if(response.data===''){
              this.production=[];
              return;
            }
            this.production=[];
            this.production.push(response.data);
          })
          .catch(function (error) {
            console.log("found failed!");
          });
      },
    },

    data() {
      return {
        dialogCreateVisible: false,
        dialogUpdateVisible: false,
        keyOption: "", //默认下拉框的选项,key值
        word: "", // 搜索框的值
        create: {
          goodsId: "",
          goodsName: "",
          measurementUnits: "",
          storehouseId: "",
          goodsSum: "",
          predictPrice: ""
        },
        createRules: {
          goodsId: [
            {required: true, message: '请输入物品编号', trigger: 'blur'}
          ],
          goodsName: [
            {required: true, message: '请输入物品名称', trigger: 'blur'}
          ],
          measurementUnits: [
            {required: true, message: '请输入计量单位', trigger: 'blur'},
          ],
          storehouseId: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          goodsSum: [
            {required: true, message: '请输入物品数量', trigger: 'blur'}
          ],
          predictPrice: [
            {required: true, message: '请输入计划单价', trigger: 'blur'}
          ]
        },
        update: {
          goodsId: "",
          goodsName: "",
          measurementUnits: "",
          storehouseId: "",
          goodsSum: "",
          predictPrice: ""
        },
        updateRules: {
          goodsId: [
            {required: true, message: '请输入物品编号', trigger: 'blur'}
          ],
          goodsName: [
            {required: true, message: '请输入物品名称', trigger: 'blur'}
          ],
          measurementUnits: [
            {required: true, message: '请输入计量单位', trigger: 'blur'},
          ],
          storehouseId: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          goodsSum: [
            {required: true, message: '请输入物品数量', trigger: 'blur'}
          ],
          predictPrice: [
            {required: true, message: '请输入计划单价', trigger: 'blur'}
          ]
        },
        production: [],
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
