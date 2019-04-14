<template>
  <div class="inStorage">
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="24" align="center">
        <b>
          <i class="el-icon-edit"></i>
        </b>
        <span><b>物品出库</b></span>
      </el-col>
      <div style="margin-top: 40px;">
        <el-col :span="24" align="left">
        </el-col>
      </div>
    </el-row>

    <br>

    <!-- 出库信息汇总 -->
    <el-table :data="warehouseExport" style="width: 100%">
      <el-table-column label="出库单编号" prop="exportId" align="center"></el-table-column>
      <el-table-column label="出库日期" prop="exportDate" align="center"></el-table-column>
      <el-table-column label="仓库编号" prop="warehouseId" align="center"></el-table-column>
      <el-table-column label="物品编号" prop="goodsId" align="center"></el-table-column>
      <el-table-column label="数量" prop="exportNumber" align="center"></el-table-column>
      <el-table-column label="订单编号" prop="orderId" align="center"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="input1" size="small" @change="selectByKeyword" placeholder="输入出库单编号搜索" @keyup.enter.native="selectByKeyword"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="setCurrent(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removed(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      :pager-count="5"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>

    <!-- 新建出库单 -->
    <el-dialog title="添加出库单" :visible.sync="dialogCreateVisible" width="600px">
      <div align="center">
        <el-form :model="create" :rules="createRules" ref="create" label-width="100px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="出库单编号" prop="exportId">
                <el-input v-model="create.exportId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="出库日期" prop="exportDate">
                <el-date-picker
                  v-model="create.exportDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="仓库编号" prop="warehouseId">
                <el-input v-model="create.warehouseId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="物品编号" prop="goodsId">
                <el-input v-model="create.goodsId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="数量" prop="exportNumber">
                <el-input v-model="create.exportNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="订单编号" prop="orderId">
                <el-input v-model="create.orderId"></el-input>
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

    <!-- 修改出库单 -->
    <el-dialog
      title="修改出库信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="400px"
    >
      <el-form :model="update" :rules="updateRules" ref="update" label-width="120px">
        <el-form-item label="出库单编号：" prop="exportId">
          <el-input v-model="update.exportId" disabled></el-input>
        </el-form-item>
        <el-form-item label="出库日期：" prop="exportDate">
          <el-date-picker
            v-model="update.exportDate"
            type="datetime"
            placeholder="选择日期时间"
            value-format="timestamp"
            style="width:100%"
          ></el-date-picker>
          <!-- <el-input v-model="update.exportDate"></el-input> -->
        </el-form-item>
        <el-form-item label="仓库编号：" prop="warehouseId">
          <el-input v-model="update.warehouseId"></el-input>
        </el-form-item>
        <el-form-item label="物品编号：" prop="goodsId">
          <el-input v-model="update.goodsId"></el-input>
        </el-form-item>
        <el-form-item label="数量：" prop="exportNumber">
          <el-input v-model="update.exportNumber"></el-input>
        </el-form-item>
        <el-form-item label="订单编号：" prop="orderId">
          <el-input v-model="update.orderId"></el-input>
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
    name: "inStorage",
    inject: ["reload"],
    mounted() {
      // 加载数据
      this.init();
    },

    methods: {
      init(){
        AjaxHelper.get("http://localhost:8081/export/selectAll", {pageNum: 1, pageSize: 10}, (data) => {
          console.log(data);
          var list = data.list;
          this.count = data.total;
          list.forEach(item => {
            this.warehouseExport.push(item);
          });
        });
      },
      handleSizeChange(val){

      },
      handleCurrentChange(val){
        this.currentPage = val;
        AjaxHelper.get("http://localhost:8081/order/selectAll", {pageNum: this.currentPage, pageSize: 10}, (data) => {
          console.log(data);
          var list = data.list;
          this.count = data.list.length;
          this.warehouseExport = [];
          list.forEach(item => {
            this.warehouseExport.push(item);
          });
        });
      },
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
            this.updateStock();
          } else {
            console.log('新建失败');
            return false;
          }
        });
      },
      check() {
        //调用数据库findOne接口查找合同编号信息
        this.$ajax.post('http://localhost:8080/warehouseExport/findOne/' + this.create.exportId,).then(response=> {
          console.log(response.data);
          //合同不存在，新建
          if(response.data === '' || response.data === null) {
            this.createStock();
          }
          else {
            this.$message.error("该出库单已存在");
            return false;
          }
        }).catch(function (error){
          console.log("新建失败")
        });
      },
      // 新建订单
      createStock() {
        let data = this.create;
        console.log(JSON.stringify(data));
        this.$ajax
          .post(
            "http://localhost:8080/warehouseExport/saveOne/",
            JSON.stringify(data),
            {
              headers: { "Content-Type": "application/json;charset=UTF-8" }
            }
          )
          .then(response => {
            console.log(response);
            this.dialogCreateVisible = false;
            this.open2();
          })
          .catch(function(error) {
            console.log("save failed！");
          });
      },
      setCurrent(currentStock) {
        console.log(currentStock);
        this.update.exportId = currentStock.exportId;
        this.update.exportDate = currentStock.exportDate;
        this.update.warehouseId = currentStock.warehouseId;
        this.update.goodsId = currentStock.goodsId;
        this.update.orderId = currentStock.orderId;
        this.update.exportNumber = currentStock.exportNumber;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },
      updateStock() {
        let data = {
          exportId: this.update.exportId,
          exportDate: this.update.exportDate,
          warehouseId: this.update.warehouseId,
          goodsId: this.update.goodsId,
          orderId: this.update.orderId,
          exportNumber: this.update.exportNumber
        };
        console.log(data);
        console.log(data);
        AjaxHelper.post("http://localhost:8081/export/update", data, (jsonResult) => {
          console.log(jsonResult);
          if (jsonResult.status == 1) {
            this.dialogUpdateVisible = false;
            this.$message.info(jsonResult.msg);
            this.$router.go(0);
          }else{
            this.$message.info(jsonResult.msg);
          }
        })
      },
      // 删除订单
      removed(currentStock) {
        console.log("删除订单");
        this.$confirm(
          "此操作将永久删除出库单信息 " + currentStock.exportId + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        )
          .then(() => {
            console.log("确认删除订单");
            // 向请求服务端删除
            this.$ajax
              .get(
                "http://localhost:8080/warehouseExport/deleteOne/" +
                currentStock.exportId
              )
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
          type: "success"
        });
      },

      selectByKeyword() {
        if(this.input1===''){
          return;
        }
        AjaxHelper.get("http://localhost:8081/export/retrieval",{keyword:this.input1},(jsonResult)=>{
          if(jsonResult.status==1){
            var list = jsonResult.data.list;
            this.warehouseExport = [];
            list.forEach(item=>{
              this.warehouseExport.push(item);
            });
            this.$message.info(jsonResult.msg);
          }else{
            this.$message.info(jsonResult.msg);
          }
        })
      }
    },

    data() {
      return {
        dialogCreateVisible: false,
        dialogUpdateVisible: false,
        keyOption: "", //默认下拉框的选项,key值
        word: "", // 搜索框的值
        create: {
          exportId: "",
          exportDate: "",
          warehouseId: "",
          goodsId: "",
          orderId: "",
          exportNumber: ""
        },
        createRules: {
          exportId: [{required: true, message: '请输入出库单编号', trigger: 'blur'}],
          exportDate: [{required: true, message: '请输入仓库编号', trigger: 'blur'}],
          warehouseId: [{required: true, message: '请输入仓库编号', trigger: 'blur'}],
          goodsId: [{required: true, message: '请输入物品编号', trigger: 'blur'}],
          orderId: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
          exportNumber: [{required: true, message: '请输出库存数量', trigger: 'blur'}]
        },
        update: {
          exportId: "",
          exportDate: "",
          warehouseId: "",
          goodsId: "",
          orderId: "",
          exportNumber: ""
        },
        updateRules: {
          exportId: [{required: true, message: '请输入出库单编号', trigger: 'blur'}],
          exportDate: [{required: true, message: '请输入出库日期', trigger: 'blur'}],
          warehouseId: [{required: true, message: '请输入仓库编号', trigger: 'blur'}],
          goodsId: [{required: true, message: '请输入物品编号', trigger: 'blur'}],
          orderId: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
          exportNumber: [{required: true, message: '请输出库存数量', trigger: 'blur'}]
        },
        warehouseExport: [],
        input1: "",
        currentPage:1,
        count:0
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
