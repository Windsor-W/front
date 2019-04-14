<template>
  <div class="login">
    <div class="header">
      <h1 class="title"><i class="el-icon-goods"></i>&nbsp;商品销售管理系统</h1>
    </div>

    <div class="back">
      <el-tabs type="card">
        <el-tab-pane label="用户登录">
          <div class="loginBox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名：" prop="account">
                <el-input v-model="ruleForm.account"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="password">
                <el-input v-model="ruleForm.password" type="password"></el-input>
              </el-form-item>

              <el-form-item style="text-align: left">
                <el-checkbox label="记住密码"></el-checkbox>
                <el-checkbox label="自动登录"></el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-button class="loginButton" type="info" @click="submitForm1('ruleForm')" round="">登录</el-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button class="resetButton" type="info" @click="resetForm('ruleForm')" round="">重置</el-button>
              </el-form-item>

              <el-form-item>
                <router-link to="/reset" class="forgetPassword" tag="a" target="_blank">忘记密码？</router-link>|&nbsp;
                <router-link to="/register" class="register" tag="a" target="_blank">新用户注册</router-link>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="管理员登录" class="tab_pane">
          <div class="loginBox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名：" prop="account">
                <el-input v-model="ruleForm.account"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="password">
                <el-input v-model="ruleForm.password" type="password"></el-input>
              </el-form-item>

              <el-form-item style="text-align: left">
                <el-checkbox label="记住密码"></el-checkbox>
                <el-checkbox label="自动登录"></el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-button class="loginButton" type="info" @click="submitForm2('ruleForm')" round="">登录</el-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button class="resetButton" type="info" @click="resetForm('ruleForm')" round="">重置</el-button>
              </el-form-item>

              <el-form-item>
                <router-link to="/reset" class="forgetPassword" tag="a" target="_blank">忘记密码？</router-link>|&nbsp;
                <router-link to="/register" class="register" tag="a" target="_blank">新用户注册</router-link>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="footer">
        <p>©2019.&nbsp;All Rights Reserved.</p>
      </div>
    </div>

  </div>

</template>

<script>
  import register from "./register";
  import {AjaxHelper} from "../../static/js/AjaxHelper"
  export default {
    name: "login",
    data() {
      return {
        ruleForm: {
          account: '',
          password: '',
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 20, message: '长度为 6～20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      //查找用户名是否存在，并且密码一致
      check(num) {
        let account = this.ruleForm.account;
        console.log(account);
        AjaxHelper.post("http://localhost:8081/user/login",{account:this.ruleForm.account,password:this.ruleForm.password},(data)=>{
          if(data.status==3){
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$router.push('warehouse');
            console.log(data);
          }else if(data.status==1){
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$router.push('shoes');
            console.log(data);
          }else{
            this.$message.info(data.msg);
          }
        })
      },
      //提交用户表单
      submitForm1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.check(1);
            //alert('登录成功');
            localStorage.setItem("user", this.ruleForm.name);
          } else {
            console.log('登录失败');
            return false;
          }
        });
       },
      //提交管理员表单
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.check(2);
            //alert('登录成功');
            localStorage.setItem("user",this.ruleForm.name);
          } else {
            console.log('登录失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components: {
      register
    }
  }
</script>

<style scoped>
  .login{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  //margin-bottom: 1%;
  }

  .tab_pane {
    color: #AAAAAA;
  }

  .header{
    background-color: rgba(92,92,92);
    margin-top: -60px;
    margin-left: -11px;
    margin-right: -11px;
    border: none;
    height: 110px;
    text-align: left;
    color: #F7F7F7;
  }

  .title{
    padding-top: 28px;
    padding-left: 15px;
    font-family: "Microsoft YaHei", Serif;
  }

  .back{
    width: 600px;
    height: 650px;
    margin-top: 50px;
    margin-left: 30%;
  }

  .loginBox{
    width: 400px;
    margin-top: 20px;
    border: 200px;
    margin-left: 7%;
    margin-bottom: 10%;
    text-align: center;
    background-color: rgba(235,235,235,0.8);
    opacity: 50%;
    padding: 70px 80px 20px 30px;
    box-shadow: #858585 10px 10px 30px;
    border-radius: 20px;
  }

  .loginButton{
    background-color: #5B5B5B;
    border: none;
    width: 100px;
  }

  .resetButton{
    background-color: #BDBDBD;
    width: 100px;
    border: none;
  }

  .demo-ruleForm{
    text-align: center;
  }

  .forgetPassword{
  //text-align: center;
    margin-left: -70px;
    text-decoration: none;
    color: #1874CD;
  }

  .register{
    text-align: center;
    text-decoration: none;
    color: #1874CD;
  }

  .footer{
  //background-color: darkgrey;
    opacity: 80%;
    line-height: 70px;
    //color: aliceblue;
  }

</style>
