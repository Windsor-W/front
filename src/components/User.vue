<template>
    <div>
      <h1 class="h1-1">shopping</h1>
      <el-row>
        <botton @click="toClothes"><el-col :span="12" class="block1"><h1 class="title1">服饰</h1></el-col></botton>
        <botton @click="toShoes"><el-col :span="12" class="block2"><h1 class="title2">鞋履</h1></el-col></botton>
      </el-row>

      <div class="footer">©2019. All Rights Reserved.</div>
    </div>
</template>

<script>
    export default {
        name: "User",
        methods: {
          toClothes() {
            this.$router.push('clothes')
          },

          toShoes() {
            this.$router.push('shoes')
          }
        }
    }
</script>

<style scoped>
  .h1-1 {
    margin-top: -40px;
    font-size: 30px;
  }
  .title1 {
    font-size: 70px;
    font-weight: normal;
    color: aliceblue;
    padding-top: 500px;
    padding-left: 50px;
    //argin-left: 5px;
    float: left;
  }
  .title2 {
    font-size: 70px;
    font-weight: normal;
    color: aliceblue;
    padding-top: 500px;
    padding-right: 50px;
    float: right;
  }
  span {
    margin-left: 0;
    margin-right: 0;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    //border-radius: 4px;
  }
  .block1 {
    min-height: 700px;
    background: url('../../src/img/5_1.jpg') no-repeat;
  }
  .block2 {
    min-height: 700px;
    background: url('../../src/img/2_1.jpg') no-repeat;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .footer {
    margin-bottom: 20px;
  }
</style>
