<template>
  <div>
    <h1 class="h1-1">Shoes</h1>
    <el-row :gutter="20">
      <el-col :span="6" v-for="good in goodsList"><img :src="good.imgUrl">
        <p>{{good.goodsName}}</p>
        <p>{{good.planPrice}}</p>
        <div>
          <el-button type="success" :id="good.goodsId" @click="buyThis(good.goodsId,good.warehouseId,1)">购买</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="footer">©2019. All Rights Reserved.</div>
  </div>
</template>

<script>
  import {AjaxHelper} from "../../static/js/AjaxHelper";
  const currentuser = JSON.parse(sessionStorage.getItem('account'));

  export default {
    mounted() {
      // 加载数据
      console.log("loading data.");
      this.getGoods();
      console.log(currentuser.account.account);

    },
    methods:{
      buyThis(goodsId,warehouseId,orderNumber){
        console.log(goodsId);
        var data = {account:currentuser.account.account,warehouseId:warehouseId,orderNumber:orderNumber,goodsId:goodsId};
        AjaxHelper.post("http://localhost:8081/order/add",data,(jsonResult)=>{
          if(jsonResult.status==1){
            this.$message.info(jsonResult.msg);
          }else{
            this.$message.info(jsonResult.msg);
          }
        })
      },
      getGoods(){
        AjaxHelper.get("http://localhost:8081/goods/selectAll",{pageNum: 1, pageSize: 100},(jsonResult)=>{
          var list = jsonResult.list;
          this.count = jsonResult.list.length;
          if(list==null){
            this.$message.info("暂无商品信息");
          }else {
            list.forEach(item=>{
              //item.imgUrl = require(item.imgUrl);
              this.goodsList.push(item);
            })
          }
        })
      }
    },
    data(){
      return{
        goodsList:[],
        account:null
      }
    }

  }
</script>

<style scoped>
  .h1-1 {
    margin-top: -40px;
    font-size: 30px;
  }

  .el-row {
    margin-bottom: 20px;

  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
  / / border-radius: 4 px;
  }

  img {
    height: 100%;
    width: 100%;
  }

  p {
    color: black;
    font-size: 15px;
    margin: 0;
  }

  .btn {
    width: 150px;
    height: 30px;
    background-color: ghostwhite;
  }
  .el-button--success{
    width: 120px;
    line-height: 10px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
  / / border-radius: 4 px;
    min-height: 36px;
  }

  .row-bg {
  / / padding: 10 px 0;
    background-color: #f9fafc;
  }

</style>
