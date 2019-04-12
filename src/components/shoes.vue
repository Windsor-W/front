<template>
  <div>
    <h1 class="h1-1">Shoes</h1>
    <el-row :gutter="20" >
      <el-col :span="6"><img src="../../src/img/s1.jpg"><p>JW Anderson 黑色Converse版网格徽标运动鞋</p><p>$155</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s2.jpg"><p>Converse 粉色 Chuck 70 扎染高帮运动鞋</p><p>$115</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s3.jpg"><p>adidas by Stella McCartney UltraBoost运动鞋</p><p>$285</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s4.jpg"><p>adidas by Stella McCartney UltraBoost运动鞋</p><p>$275</p><div><button type="button" class="btn">购买</button></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><img src="../../src/img/s5.jpg"><p>adidas Originals 多色Yung-1运动鞋</p><p>$150</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s6.jpg"><p>adidas Originals UltraBOOST 19运动鞋</p><p>$225</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s7.jpg"><p>adidas Originals Nite Jogger运动鞋</p><p>$160</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s8.jpg"><p>Balenciaga 灰色&紫色 Track运动鞋</p><p>$1025</p><div><button type="button" class="btn">购买</button></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><img src="../../src/img/s9.jpg"><p>Balenciaga 灰白色&橙色 Track运动鞋</p><p>$1025</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s10.jpg"><p>Balenciaga 绿色Triple S运动鞋</p><p>$1200</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s11.jpg"><p>NikeLab 粉色Martine Rose Monarch IV</p><p>$400</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s12.jpg"><p>NikeLab 白色Martine Rose Monarch IV</p><p>$400</p><div><button type="button" class="btn">购买</button></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><img src="../../src/img/s13.jpg"><p>Raf Simons x adidas Originals Ozweego运动鞋</p><p>$525</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s14.jpg"><p>Vans Anaheim Factory Era 95 DX 运动鞋</p><p>$85</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s15.jpg"><p>Gucci 白色 Screener 运动鞋</p><p>$925</p><div><button type="button" class="btn">购买</button></div></el-col>
      <el-col :span="6"><img src="../../src/img/s16.jpg"><p>Vetements 灰色&黄色 Reebok版Spike Runner 400运动鞋</p><p>$1300</p><div><button type="button" class="btn">购买</button></div></el-col>
    </el-row>
    <div class="footer">©2019. All Rights Reserved.</div>
  </div>
</template>

<script>
  export default {
    data(){

    },
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
