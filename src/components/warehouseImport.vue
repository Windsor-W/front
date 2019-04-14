<template>
  <div class="inStorage">
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="24" align="center">
        <b>
          <i class="el-icon-edit"></i>
        </b>
        <span><b>物品入库信息</b></span>
      </el-col>
      <div style="margin-top: 40px;">
        <el-col :span="24" align="left">
        </el-col>
      </div>
    </el-row>
    <br>

    <!-- 入库信息汇总 -->
    <el-table :data="warehouseImport" style="width: 100%">
      <el-table-column label="入库单编号" prop="importId" align="center"></el-table-column>
      <el-table-column label="入库日期" prop="entryDate" align="center"></el-table-column>
      <el-table-column label="仓库编号" prop="warehouseId" align="center"></el-table-column>
      <el-table-column label="物品编号" prop="goodsId" align="center"></el-table-column>
      <el-table-column label="数量" prop="importNumber" align="center"></el-table-column>
      <el-table-column label="合同号" prop="contractId" align="center"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="input1" size="small" @change="selectByKeyword" placeholder="输入入库单编号搜索" @keyup.enter.native="selectByKeyword"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="setCurrent(scope.row)">编辑</el-button>
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
    <!-- 新建入库单 -->
    <el-dialog title="添加入库单" :visible.sync="dialogCreateVisible" width="600px">
      <div align="center">
        <el-form :model="create" :rules="createRules" ref="create" label-width="100px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="入库单编号" prop="importId">
                <el-input v-model="create.importId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="入库日期" prop="entryDate">
                <el-date-picker
                  v-model="create.entryDate"
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
              <el-form-item label="数量" prop="importNumber">
                <el-input v-model="create.importNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="合同号" prop="contractId">
                <el-input v-model="create.contractId"></el-input>
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

    <!-- 修改入库单 -->
    <el-dialog
      title="修改入库信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="400px"
    >
      <el-form :model="update" :rules="updateRules" ref="update" label-width="120px">
        <el-form-item label="入库单编号：" prop="importId">
          <el-input v-model="update.importId" disabled></el-input>
        </el-form-item>
        <el-form-item label="入库日期：" prop="entryDate">
          <el-date-picker
            v-model="update.entryDate"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间"
            style="width:100%"
          ></el-date-picker>
          <!-- <el-input v-model="update.entryDate"></el-input> -->
        </el-form-item>
        <el-form-item label="仓库编号：" prop="warehouseId">
          <el-select v-model="update.warehouseId" placeholder="请选择">
            <el-option
              style="width:100%"
              v-for="item in options"
              :key="item.value + '-label'"
              :label="item.label"
              :value="item.value ">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物品编号：" prop="goodsId">
          <el-input v-model="update.goodsId" disabled></el-input>
        </el-form-item>
        <el-form-item label="数量：" prop="importNumber">
          <el-input v-model="update.importNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="合同号：" prop="contractId">
          <el-input v-model="update.contractId" disabled></el-input>
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
      console.log("loading data.");
      this.init();
      this.getWarehouse();
    },

    methods: {
      init(){
        AjaxHelper.get("http://localhost:8081/import/selectAll", {pageNum: 1, pageSize: 10}, (data) => {
          console.log(data);
          var list = data.list;
          list.forEach(item => {
            this.warehouseImport.push(item);
          });
          this.count = data.list.length;
        });
      },
      handleSizeChange(val){

      },
      handleCurrentChange(val){
        this.currentPage = val;
        AjaxHelper.get("http://localhost:8081/import/selectAll", {pageNum: this.currentPage, pageSize: 10}, (data) => {
          console.log(data);
          var list = data.list;
          this.count = data.list.length;
          this.warehouseImport = [];
          list.forEach(item => {
            this.warehouseImport.push(item);
          });
        });
      },
      getWarehouse(){
        AjaxHelper.get("http://localhost:8081/warehouse/selectAll",{pageNum: 1, pageSize: 10},(jsonResult)=>{
          var list = jsonResult.list;
          var option={};
          for(let i = 0; i< list.length; i++){
            option.value = list[i].warehouseid;
            option.label = list[i].warehouseid;
            this.options.push(option);
            option = {};
          }
        })
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
        this.$ajax.post('http://localhost:8080/warehouseImport/findOne/' + this.create.importId,).then(response=> {
          console.log(response.data);
          //合同不存在，新建
          if(response.data === '' || response.data === null) {
            this.createStock();
          }
          else {
            this.$message.error("该入库单已存在");
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
            "http://localhost:8080/warehouseImport/saveOne/",
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
        this.update.importId = currentStock.importId;
        this.update.entryDate = currentStock.entryDate;
        this.update.warehouseId = currentStock.warehouseId;
        this.update.goodsId = currentStock.goodsId;
        this.update.contractId = currentStock.contractId;
        this.update.importNumber = currentStock.importNumber;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },
      updateStock() {
        let data = {
          importId: this.update.importId,
          entryDate: this.update.entryDate,
          warehouseId: this.update.warehouseId,
          goodsId: this.update.goodsId,
          contractId: this.update.contractId,
          importNumber: this.update.importNumber
        };
        console.log(data);
        AjaxHelper.post("http://localhost:8081/import/update", data, (jsonResult) => {
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
          "此操作将永久删除入库单信息 " + currentStock.importId + ", 是否继续?",
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
                "http://localhost:8080/warehouseImport/deleteOne/" +
                currentStock.importId
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
        AjaxHelper.get("http://localhost:8081/import/retrieval",{keyword:this.input1},(jsonResult)=>{
          if(jsonResult.status==1){
            var list = jsonResult.data.list;
            this.warehouseImport = [];
            list.forEach(item=>{
              this.warehouseImport.push(item);
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
          importId: "",
          entryDate: "",
          warehouseId: "",
          goodsId: "",
          contractId: "",
          importNumber: ""
        },
        createRules: {
          importId: [{required: true, message: '请输入入库单编号', trigger: 'blur'}],
          //entryDate: [{required: true, message: '请输入仓库编号', trigger: 'blur'}],
          warehouseId: [{required: true, message: '请输入仓库编号', trigger: 'blur'}],
          goodsId: [{required: true, message: '请输入物品编号', trigger: 'blur'}],
          contractId: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
          importNumber: [{required: true, message: '请输入库存数量', trigger: 'blur'}]
        },
        update: {
          importId: "",
          entryDate: "",
          warehouseId: "",
          goodsId: "",
          contractId: "",
          importNumber: ""
        },
        updateRules: {
          importId: [{required: true, message: '请输入入库单编号', trigger: 'blur'}],
          //entryDate: [{required: true, message: '请输入仓库编号', trigger: 'blur'}],
          warehouseId: [{required: true, message: '请输入仓库编号', trigger: 'blur'}],
          goodsId: [{required: true, message: '请输入物品编号', trigger: 'blur'}],
          contractId: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
          importNumber: [{required: true, message: '请输入库存数量', trigger: 'blur'}]
        },
        warehouseImport: [],
        input1: "",
        options: [],
        value: '',
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
  .el-select{
    width: 100%;
  }


</style>
