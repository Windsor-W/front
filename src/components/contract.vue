<template>
  <div class="Contracts">
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="24" align="center">
        <b>
          <i class="el-icon-edit"></i>
        </b>
        <span><b>采购合同信息</b></span>
      </el-col>
      <div style="margin-top: 40px;">
        <el-col :span="24" align="left">
          <el-button type="info" size="small" @click="dialogCreateVisible = true">添加合同信息</el-button>
        </el-col>
      </div>
    </el-row>

    <br>

    <!-- 合同信息汇总 -->
    <el-table :data="Contract" style="width: 100%">
      <el-table-column label="合同号" prop="contractId" align="center"></el-table-column>
      <el-table-column label="供应商号" prop="contractShop" align="center"></el-table-column>
      <el-table-column label="物品编号" prop="goodsId" align="center"></el-table-column>
      <el-table-column label="供应单价" prop="singlePrice" align="center"></el-table-column>
      <el-table-column label="合同数量" prop="contractNumber" align="center"></el-table-column>
      <el-table-column label="实际入库数量" prop="realNumber" align="center"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="input1" size="small" @change="selectByKeyword" placeholder="输入合同号搜索" @keyup.enter.native="selectByKeyword"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="setCurrent(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removed(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新建合同 -->
    <el-dialog title="添加合同文件" :visible.sync="dialogCreateVisible" width="700px">
      <div align="center">
        <el-form :model="create" :rules="createRules" ref="create" label-width="150px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="合同号：" prop="contractId">
                <el-input v-model="create.contractId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="供应商号：" prop="contractShop">
                <el-input v-model="create.contractShop"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="物品编号：" prop="goodsId">
                <el-select v-model="create.goodsId" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value + '-label'"
                    :label="item.label"
                    :value="item.value ">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="供应单价：" prop="singlePrice">
                <el-input v-model="create.singlePrice"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="合同数量：" prop="contractNumber">
                <el-input v-model="create.contractNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="实际入库数量：" prop="realNumber">
                <el-input v-model="create.realNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="info" @click="submitForm('create')">确 定</el-button>
        <el-button @click="dialogCreateVisible = false">取 消</el-button>
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
        <el-form-item label="合同号：" prop="contractId">
          <el-input v-model="update.contractId" disabled title="合同号不可修改"></el-input>
        </el-form-item>
        <el-form-item label="供应商号：" prop="contractShop">
          <el-input v-model="update.contractShop"></el-input>
        </el-form-item>
        <el-form-item label="物品编号：" prop="goodsId">
          <el-select v-model="update.goodsId" placeholder="请选择">
            <el-option
              v-for="item in updateOptions"
              :key="item.value + '-label'"
              :label="item.label"
              :value="item.value ">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应单价：" prop="singlePrice">
          <el-input v-model="update.singlePrice"></el-input>
        </el-form-item>
        <el-form-item label="合同数量：" prop="contractNumber">
          <el-input v-model="update.contractNumber"></el-input>
        </el-form-item>
        <el-form-item label="实际入库数量：" prop="realNumber">
          <el-input v-model="update.realNumber"></el-input>
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
  import {AjaxHelper} from "../../static/js/AjaxHelper"

  export default {
    name: "Contracts",
    inject: ["reload"],
    mounted() {
      // 加载数据
      this.init();
      this.getGoods();
    },

    methods: {
      init() {
        AjaxHelper.get("http://localhost:8081/contract/selectAll", {pageNum: 1, pageSize: 10}, (jsonResult) => {
          var list = jsonResult.list;
          list.forEach(item => {
            this.Contract.push(item);
          });

        })
      },
      getGoods() {
        AjaxHelper.get("http://localhost:8081/goods/selectAll", {pageNum: 1, pageSize: 10}, (jsonResult) => {
          var list = jsonResult.list;
          var option = {};
          list.forEach(item => {
            option.value = item.goodsId;
            option.label = item.goodsName;
            this.options.push(option);
            this.updateOptions.push(option);
            option = {};
          })
        })
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.createContract();
          } else {
            console.log('新建失败');
            return false;
          }
        });
      },
      // 新建合同
      createContract() {
        let data = this.create;
        AjaxHelper.post("http://localhost:8081/contract/add", data, (jsonResult) => {
          if (jsonResult.status == 1) {
            this.$message.info(jsonResult.msg);
            this.dialogCreateVisible = false;
            this.$router.go(0);
          } else {
            this.$message.info(jsonResult.msg);
          }
        })
      },
      //提交表单
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateContract();
          } else {
            console.log('修改失败');
            return false;
          }
        });
      },

      setCurrent(currentContract) {
        console.log(currentContract);
        this.update.contractId = currentContract.contractId;
        this.update.contractShop = currentContract.contractShop;
        this.update.goodsId = currentContract.goodsId;
        this.update.contractNumber = currentContract.contractNumber;
        this.update.singlePrice = currentContract.singlePrice;
        this.update.realNumber = currentContract.realNumber;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },

      updateContract() {
        let data = {
          contractId: this.update.contractId,
          contractShop: this.update.contractShop,
          goodsId: this.update.goodsId,
          contractNumber: this.update.contractNumber,
          singlePrice: this.update.singlePrice,
          realNumber: this.update.realNumber
        };
        console.log(data);
        AjaxHelper.post("http://localhost:8081/contract/update", data, (jsonResult) => {
          if (jsonResult.status == 1) {
            console.log(jsonResult);
            this.dialogUpdateVisible = false;
            this.$message.info(jsonResult.msg);
            this.$router.go(0);
          } else {
            this.$message.info(jsonResult.msg);
          }
        })
      },

      removed(currentContract) {
        console.log("删除采购合同信息");
        this.$confirm(
          "此操作将永久删除采购合同信息 " +
          currentContract.contractId +
          ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认删除采购合同信息");
          // 向请求服务端删除
          AjaxHelper.get("http://localhost:8081/contract/delete", {contractId: currentContract.contractId}, (jsonResult) => {
              if(jsonResult.status==1){
                this.$message.info(jsonResult.msg);
                this.$router.go(0);
              }else{
                this.$message.info(jsonResult.msg);
              }
          })
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
        if (this.input1 === '') {
          return;
        }
        //let data = this.input1;
        console.log(this.input1);
        AjaxHelper.get("http://localhost:8081/contract/retrieval",{keyword:this.input1},(jsonResult)=>{
          if(jsonResult.status==1){
            var list = jsonResult.data.list;
            this.Contract = [];
            list.forEach(item=>{
              this.Contract.push(item);
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
          contractId: "",
          contractShop: "",
          goodsId: "",
          contractNumber: "",
          singlePrice: "",
          realNumber: ""
        },
        createRules: {
          contractId: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
          contractShop: [{required: true, message: '请输入供应商编号', trigger: 'blur'}],
          goodsId: [{required: true, message: '请输入物品编号', trigger: 'blur'}],
          contractNumber: [{required: true, message: '请输入合同数量', trigger: 'blur'}],
          singlePrice: [{required: true, message: '请输入供应单价', trigger: 'blur'}],
          realNumber: [{required: true, message: '请输入实际入库数量', trigger: 'blur'}]
        },
        update: {
          contractId: "",
          contractShop: "",
          goodsId: "",
          contractNumber: "",
          singlePrice: "",
          deliveryDate: "",
          realNumber: ""
        },
        updateRules: {
          contractId: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
          contractShop: [{required: true, message: '请输入供应商编号', trigger: 'blur'}],
          goodsId: [{required: true, message: '请输入物品编号', trigger: 'blur'}],
          contractNumber: [{required: true, message: '请输入合同数量', trigger: 'blur'}],
          singlePrice: [{required: true, message: '请输入供应单价', trigger: 'blur'}],
          realNumber: [{required: true, message: '请输入实际入库数量', trigger: 'blur'}]
        },
        Contract: [],
        input1: "",
        options: [],
        value: '',
        updateOptions: []
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

  .el-select {
    width: 100%;
  }
</style>
