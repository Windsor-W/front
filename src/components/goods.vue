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
      <el-table-column label="仓库编号" prop="warehouseId" align="center"></el-table-column>
      <el-table-column label="数量" prop="goodsNumber" align="center"></el-table-column>
      <el-table-column label="计划单价" prop="planPrice" align="center"></el-table-column>
      <el-table-column label="供应单价" prop="singlePrice" align="center"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="input1" size="small" placeholder="输入物品编号搜索" @keyup.enter.native="selectByKeyword"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="setCurrent(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removed(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
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
              <el-form-item label="仓库：" prop="goodsNumber">
                <el-select v-model="create.warehouseId" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value + '-label'"
                    :label="item.label"
                    :value="item.value ">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="数量：" prop="goodsNumber">
                <el-input v-model="create.goodsNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="计划单价：" prop="planPrice">
                <el-input v-model="create.planPrice"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="供应单价：" prop="singlePrice">
                <el-input v-model="create.singlePrice"></el-input>
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
          <el-input v-model="update.goodsId" readonly="true" disabled title="物品编号无法修改"></el-input>
        </el-form-item>
        <el-form-item label="物品名称：" prop="goodsName">
          <el-input v-model="update.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="仓库编号：" prop="warehouseId">
          <el-input v-model="update.warehouseId"></el-input>
        </el-form-item>
        <el-form-item label="数量：" prop="goodsNumber">
          <el-input v-model="update.goodsNumber"></el-input>
        </el-form-item>
        <el-form-item label="计划单价：" prop="planPrice">
          <el-input v-model="update.planPrice"></el-input>
        </el-form-item>
        <el-form-item label="计划单价：" prop="singlePrice">
          <el-input v-model="update.singlePrice"></el-input>
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
    name: "Goods",
    inject: ["reload"],
    mounted() {
      // 加载数据
      console.log("loading data.");
      this.init();
      this.getWarehouse();
    },

    methods: {
      handleSizeChange(val){

      },
      handleCurrentChange(val){
        this.currentPage = val;
        AjaxHelper.get("http://localhost:8081/goods/selectAll", {pageNum: this.currentPage, pageSize: 10}, (data) => {
          console.log(data);
          var list = data.list;
          this.count = data.list.length;
          this.production = [];
          list.forEach(item => {
            this.production.push(item);
          });
        });
      },
      getWarehouse(){
        AjaxHelper.get("http://localhost:8081/warehouse/selectAll",{pageNum: 1, pageSize: 10},(jsonResult)=>{
          var list = jsonResult.list;
          var option={};
          for(let i = 0; i< list.length; i++){
            option.value = list[i].warehouseid;
            option.label = list[i].warehousetype;
            this.options.push(option);
            option = {};
          }
        })
      },
      init(){
        AjaxHelper.get("http://localhost:8081/goods/selectAll",{pageNum: 1, pageSize: 10},(jsonResult)=>{
          var list = jsonResult.list;
          this.count = jsonResult.list.length;
          if(list==null){
            this.$message.info("暂无商品信息");
          }else {
            console.log("list"+list);
            list.forEach(item=>{
              this.production.push(item);
            })
          }
        })
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.createGoods();
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
      createGoods() {
        let data = this.create;
        console.log(data);
        console.log("this.data.warehouseId"+data.warehouseId);
        AjaxHelper.post("http://localhost:8081/goods/add",data,(jsonResult)=>{
          if(jsonResult.status==1){
            this.$message.info(jsonResult.msg);
            this.$router.go(0);
          }else{
            this.$message.info(jsonResult.msg);
          }
        })
      },
      setCurrent(currentProduct) {
        console.log(currentProduct);
        this.update.goodsId = currentProduct.goodsId;
        this.update.goodsName = currentProduct.goodsName;
        this.update.planPrice = currentProduct.planPrice;
        this.update.warehouseId = currentProduct.warehouseId;
        this.update.singlePrice = currentProduct.singlePrice;
        this.update.goodsNumber = currentProduct.goodsNumber;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },
      updateProduction() {
        let data = {
          goodsId: this.update.goodsId,
          goodsName: this.update.goodsName,
          planPrice: this.update.planPrice,
          warehouseId: this.update.warehouseId,
          singlePrice: this.update.singlePrice,
          goodsNumber: this.update.goodsNumber
        };
        console.log(data);
        AjaxHelper.post("http://localhost:8081/goods/update",data,(jsonResult)=>{
          if(jsonResult.status==1){
            this.$message.info(jsonResult.msg);
            this.$router.go(0);
          }else{
            this.$message.info(jsonResult.msg);
          }

        })
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
            AjaxHelper.get("http://localhost:8081/goods/delete",{goodsId:goodsId},(jsonResult)=>{
              if(jsonResult.status==1){
                this.$message.info(jsonResult.msg);
                this.$router.go(0);
              }else{
                this.$message.info(jsonResult.msg);
              }
            })
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
      selectByKeyword() {
        if (this.input1 === '') {return;}
        //let data = this.input1;
        console.log(this.input1);
        AjaxHelper.get("http://localhost:8081/goods/retrieval",{keyword:this.input1},(jsonResult)=>{
          if(jsonResult.status==1){
            var list = jsonResult.data.list;
            this.production = [];
            list.forEach(item=>{
              this.production.push(item);
            });
            console.log(jsonResult);
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
          goodsId: "",
          goodsName: "",
          planPrice: "",
          warehouseId: "",
          goodsNumber: "",
          singlePrice: ""
        },
        createRules: {
          goodsId: [
            {required: true, message: '请输入物品编号', trigger: 'blur'}
          ],
          goodsName: [
            {required: true, message: '请输入物品名称', trigger: 'blur'}
          ],
          planPrice: [
            {required: true, message: '请输入计划单价', trigger: 'blur'},
          ],
          warehouseId: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          goodsNumber: [
            {required: true, message: '请输入物品数量', trigger: 'blur'}
          ],
          singlePrice: [
            {required: true, message: '请输入计划单价', trigger: 'blur'}
          ]
        },
        update: {
          goodsId: "",
          goodsName: "",
          planPrice: "",
          warehouseId: "",
          goodsNumber: "",
          singlePrice: ""
        },
        updateRules: {
          goodsId: [
            {required: true, message: '请输入物品编号', trigger: 'blur'}
          ],
          goodsName: [
            {required: true, message: '请输入物品名称', trigger: 'blur'}
          ],
          planPrice: [
            {required: true, message: '请输入计划单价', trigger: 'blur'},
          ],
          warehouseId: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          goodsNumber: [
            {required: true, message: '请输入物品数量', trigger: 'blur'}
          ],
          singlePrice: [
            {required: true, message: '请输入计划单价', trigger: 'blur'}
          ]
        },
        production: [],
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
</style>
