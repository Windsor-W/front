<template>
  <div class="Orders">
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="24" align="center">
        <b>
          <i class="el-icon-edit"></i>
        </b>
        <span><b>订单信息</b></span>
      </el-col>
      <div style="margin-top: 40px;">
        <el-col :span="24" align="left">
        </el-col>
      </div>
    </el-row>

    <br>

    <!-- 订单信息汇总 -->
    <el-table :data="Order" style="width: 100%">
      <el-table-column label="订单编号" prop="orderId" align="center"></el-table-column>
      <el-table-column label="订单创建时间" prop="orderTime" align="center"></el-table-column>
      <el-table-column label="消费者账号" prop="account" align="center"></el-table-column>
      <el-table-column label="仓库编号" prop="warehouseId" align="center"></el-table-column>
      <el-table-column label="物品编号" prop="goodsId" align="center"></el-table-column>
      <el-table-column label="数量" prop="orderNumber" align="center"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="input1" size="small" @change="selectByKeyword" placeholder="输入订单编号搜索" @keyup.enter.native="selectByKeyword"/>
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
    <!-- 新建合同 -->
    <el-dialog title="添加订单" :visible.sync="dialogCreateVisible" width="730px">
      <div align="center">
        <el-form :model="create" :rules="createRules" ref="create" label-width="150px">
          <el-row>
            <el-col span="11">
              <el-form-item label="订单编号：" prop="orderId">
                <el-input v-model="create.orderId"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="11">
              <el-form-item label="订单创建时间：" prop="orderTime">
                <el-date-picker
                  v-model="create.orderTime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="11">
              <el-form-item label="消费者账号：" prop="account">
                <el-input v-model="create.account"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="仓库编号：" prop="warehouseId">
                <el-input v-model="create.warehouseId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="11">
              <el-form-item label="物品编号：" prop="goodsId">
                <el-input v-model="create.goodsId"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="11">
              <el-form-item label="数量：" prop="orderNumber">
                <el-input v-model="create.orderNumber"></el-input>
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

    <!-- 修改合同 -->
    <el-dialog
      title="修改合同信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="update" :rules="updateRules" ref="update" label-width="150px">
        <el-form-item label="订单编号：" prop="orderId">
          <el-input v-model="update.orderId" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="订单创建时间：" prop="orderTime">
          <el-date-picker
            v-model="update.orderTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="消费者帐号：" prop="account">
          <el-input v-model="update.account"></el-input>
        </el-form-item>
        <el-form-item label="仓库编号：" prop="warehouseId">
          <el-input v-model="update.singlePrice"></el-input>
        </el-form-item>
        <el-form-item label="物品编号：" prop="goodsId">
          <el-input v-model="update.OrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="数量：" prop="orderNumber">
          <el-input v-model="update.orderNumber"></el-input>
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
    name: "Orders",
    inject: ["reload"],
    mounted() {
      // 加载数据
      console.log("loading data.");
      this.init();
    },

    methods: {
      init(){
        AjaxHelper.get("http://localhost:8081/order/selectAll", {pageNum: 1, pageSize: 10}, (data) => {
          console.log(data);
          var list = data.list;
          this.count = data.list.length;
          list.forEach(item => {
            this.Order.push(item);
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
          this.warehouseImport = [];
          list.forEach(item => {
            this.warehouseImport.push(item);
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
      check() {
        //调用数据库findOne接口查找合同编号信息
        this.$ajax.post('http://localhost:8080/order/findOne/' + this.create.orderId,).then(response=> {
          console.log(response.data);
          //合同不存在，新建
          if(response.data === '' || response.data === null) {
            this.createOrder();
          }
          else {
            this.$message.error("该订单已存在");
            return false;
          }
        }).catch(function (error){
          console.log("新建失败")
        });
      },
      //提交表单
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateOrder();
          } else {
            console.log('修改失败');
            return false;
          }
        });
      },
      // 新建合同
      createOrder() {
        let data = this.create;
        console.log(data);
        this.$ajax
          .post(
            "http://localhost:8080/order/saveOne/",
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
      setCurrent(currentOrder) {
        console.log(currentOrder);
        this.update.orderId = currentOrder.orderId;
        this.update.orderTime = currentOrder.orderTime;
        this.update.account = currentOrder.account;
        this.update.warehouseId = currentOrder.warehouseId;
        this.update.goodsId = currentOrder.goodsId;
        this.update.orderNumber = currentOrder.orderNumber;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },

      updateOrder() {
        let data = {
          orderId: this.update.orderId,
          orderTime: this.update.orderTime,
          account: this.update.account,
          warehouseId: this.update.warehouseId,
          goodsId: this.update.goodsId,
          orderNumber: this.update.orderNumber
        };
        console.log(data);
        this.$ajax
          .post(
            "http://localhost:8080/order/updateOne/",
            JSON.stringify(data),
            {
              headers: { "Content-Type": "application/json;charset=UTF-8" }
            }
          )
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

      removed(currentOrder) {
        console.log("删除订单信息");
        this.$confirm(
          "此操作将永久删除订单信息 " +
          currentOrder.orderId +
          ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认删除订单信息");
          // 向请求服务端删除
          this.$ajax
            .get(
              "http://localhost:8080/order/deleteOne/" + currentOrder.orderId
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
          type: "warning"
        });
      },
      //查询合同
      selectByKeyword() {
        if (this.input1 === '') {return;}
        //let data = this.input1;
        console.log(this.input1);
        AjaxHelper.get("http://localhost:8081/order/retrieval",{keyword:this.input1},(jsonResult)=>{
          if(jsonResult.status==1){
            var list = jsonResult.data.list;
            this.Order = [];
            list.forEach(item=>{
              this.Order.push(item);
            });
            this.$message.info(jsonResult.msg);
          }else{
            this.$message.info(jsonResult.msg);
          }
        })
      },
    },
    data() {
      return {
        dialogCreateVisible: false,
        dialogUpdateVisible: false,
        keyOption: "", //默认下拉框的选项,key值
        word: "", // 搜索框的值
        create: {
          orderId: "",
          orderTime: "",
          account: "",
          warehouseId: "",
          goodsId: "",
          orderNumber: ""
        },
        createRules: {
          orderId: [{required: true, message: '请输入订单编号', trigger: 'blur'}],
          orderTime: [{required: true, message: '请选择订单时间', trigger: 'blur'}],
          account: [{required: true, message: '请输入消费者帐号', trigger: 'blur'}],
          warehouseId: [{required: true, message: '请输入仓库编号', trigger: 'blur'}],
          goodsId: [{required: true, message: '请输入物品编号', trigger: 'blur'}],
          orderNumber: [{required: true, message: '请输入订单数量', trigger: 'blur'}]
        },
        update: {
          orderId: "",
          orderTime: "",
          account: "",
          warehouseId: "",
          goodsId: "",
          orderNumber: ""
        },
        updateRules: {
          orderId: [{required: true, message: '请输入订单编号', trigger: 'blur'}],
          orderTime: [{required: true, message: '请选择订单时间', trigger: 'blur'}],
          account: [{required: true, message: '请输入消费者帐号', trigger: 'blur'}],
          warehouseId: [{required: true, message: '请输入仓库编号', trigger: 'blur'}],
          goodsId: [{required: true, message: '请输入物品编号', trigger: 'blur'}],
          orderNumber: [{required: true, message: '请输入订单数量', trigger: 'blur'}]
        },
        Order: [],
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
