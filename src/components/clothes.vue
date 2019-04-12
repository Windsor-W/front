<template>
  <div>
    <h1 class="h1-1">Clothes</h1>
    <el-row :gutter="20">
      <el-col :span="6"><img src="../../src/img/c1.jpg"><p>ADER error 拼色套头衫</p><p>$345</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/c2.jpg"><p>ADER error 叠层廓形套头夹克</p><p>$485</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/c3.jpg"><p>ADER error 拼色套头衫</p><p>$345</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/c4.jpg"><p>ADER error 常规版型T恤</p><p>$155</p><div><button type="button" class="btn">购买</button></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><img src="../../src/img/c5.jpg"><p>032c 粉色扎染T恤</p><p>$130</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/c6.jpg"><p>032c 口袋马甲</p><p>$270</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/c7.jpg"><p>A-Cold-Wall* 黑色两穿连帽衫</p><p>$685</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/c8.jpg"><p>A-Cold-Wall* 粉色方括号拉链连帽衫</p><p>$620</p><div><button type="button" class="btn">购买</button></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><img src="../../src/img/c9.jpg"><p>Comme des Garçons 锯齿镂空西装外套</p><p>$2875</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/c10.jpg"><p>Comme des Garçons 黑色磨边西装外套</p><p>$1920</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/c11.jpg"><p>Comme des Garçons 白色拉链T恤</p><p>$900</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/c12.jpg"><p>Comme des Garçons 黑色链条T恤</p><p>$660</p><div><button type="button" class="btn">购买</button></div></el-col>
    </el-row>
    <div class="footer">©2019. All Rights Reserved.</div>
  </div>
</template>

<script>
  export default {
    name: "shoes"
  }
</script>

<style scoped>
  .h1-1 {
    margin-top: -40px;
    font-size: 30px;
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

  img {
    height: 65%;
    width: 65%;
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
  //border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
  //padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
