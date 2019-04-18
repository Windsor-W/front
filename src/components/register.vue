<template>
  <div class="passForget">
    <div class="header">
      <h1 class="title"><i class="icon-user"></i>&nbsp;用户注册</h1>
    </div>

    <div class="back">
      <div class="passForgetBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="pass">
            <el-input v-model="ruleForm.pass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password"></el-input>
          </el-form-item>

          <br>

          <el-form-item>
            <el-button class="confirmButton" type="info" @click="submitForm('ruleForm')" round="">确定</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button class="resetButton" type="info" @click="resetForm('ruleForm')" round="">重置</el-button>
          </el-form-item>

        </el-form>
      </div>

      <div class="footer">
        <p>©2019.&nbsp;All Rights Reserved.</p>
      </div>

    </div>
  </div>
</template>

<script>
  import {AjaxHelper} from "../../static/js/AjaxHelper";
  export default {
    name: "passForget",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          ID: '',
          name:'',
          pass: '',
          checkPass: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur'},
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },

    methods: {
      //连接数据库，更新用户
      updateUser() {
        let data ={
          account: this.ruleForm.name.toString(),
          password: this.ruleForm.pass
        };
        console.log(data);
        AjaxHelper.post("http://localhost:8081/user/register",data,(jsonResult)=>{
          if(jsonResult.status==1){
            this.$message.info(jsonResult.msg);
            this.$router.push("/");
          }else{
            this.$message.info(jsonResult.msg);
          }
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateUser();
            this.$router.push('login');
          } else {
            console.log('error submit!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .back{
    width: 1445px;
    height: 580px;
    margin-left: -10px;
    padding-top: 20%;
    margin-top: -145px;
  }

  .passForget{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 50px;
  }

  .header{
    background-color: #5C5C5C;
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
    font-family: "Microsoft YaHei",serif;
  }

  .passForgetBox{
    width: 400px;
  //margin-top: 8%;
    margin-left: 32%;
    margin-bottom: 7%;
    text-align: center;
    background-color: rgba(235,235,235,0.7);
    opacity: 50%;
    padding: 60px 80px 30px 30px;
    box-shadow: #858585 10px 10px 30px;
    border-radius: 20px;
  }

  .confirmButton{
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

  .footer {
  //color: azure;
  }
</style>
