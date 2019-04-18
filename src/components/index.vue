<template>
  <div class="index2">
    <el-container class="leftContainer">
      <!--左侧导航栏-->
      <el-aside width="250px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#D3D3D3"
          text-color="#787878"
          active-text-color="#000000">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>库存信息</span>
            </template>
            <el-menu-item-group>
              <router-link to="warehouse">
                <el-menu-item index="1-1">仓库信息</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link to="goods">
                <el-menu-item index="1-2">物品信息</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>进货信息</span>
            </template>
            <el-menu-item-group>
              <router-link to="contract">
                <el-menu-item index="2-1">采购合同</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link to="warehouseImport">
                <el-menu-item index="2-2">商品入库</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>出售信息</span>
            </template>
            <el-menu-item-group>
              <router-link to="order">
                <el-menu-item index="3-1">购买订单</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link to="warehouseExport">
                <el-menu-item index="3-2">商品出库</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧显示 -->
      <el-container class="rightContainer">
        <!-- 顶部 -->
        <el-header class="headerContainer">
          <el-dropdown>
            <i class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" style="color: grey" @click="toLogin">切换用户</el-button>
              </el-dropdown-item>

              <el-dropdown-item>
                <el-button type="text" style="color: grey" @click="logOut">注销</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <!-- 页面内容 -->
        <el-main>
          <!--内容显示容器-->
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>

        <el-footer class="footer">
            <p class="f">©2019.&nbsp;All Rights Reserved.</p>
        </el-footer>
      </el-container>
    </el-container>
  </div>

</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isRouterAlive: true,
      }
    },
    provide() {
      return{
        reload: this.reload
      }
    },
    methods: {
      logOut() {
        //删除localStorage
        // sessionStorage.removeItem("account");
        this.$router.push("/");
      },
      toLogin() {
        this.$router.push('/Login');
      },
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(()=>(this.isRouterAlive=true));
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu a{
    text-decoration: none;
    color: #FAFAFA;
  }

  .leftContainer {
    flex: 2;
    background-color: #E0E0E0;

  }

  .index2 {
    display: flex;
    min-height: 840px;
    margin-top: -60px;
    margin-left: -8px;
    margin-right: -8px;
  }

  .rightContainer {
    flex: 8;
    background-color: #EBEBEB;
  }

  .headerContainer {
    text-align: right;
    font-size: 12px;
    height: 80px;
    vertical-align: middle;
    background-color: darkgrey;
    opacity: 80%;
  }

  .el-icon-setting {
    padding-top: 25px;
    color: azure;
    border: none;
  }

  .footer{
    background-color: darkgrey;
    opacity: 80%;
  }

</style>
