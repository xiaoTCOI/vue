<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/image/login.jpg" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form  ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-retractwode"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-retractmima"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login_container",
  data(){
    return {
      // 这是登录表单的数据绑定对象
      loginForm:{
        username:"admin",
        password:"123456"
      },
      // 这是表单的验证规则对象
      loginFormRules:{
        // 验证用户名是否合法
        username:[
        { required: true, message: '请输入登录名称', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password:[
        { required: true, message: '请输入登录密码', trigger: 'blur' },
        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields();
    },
    login(){
      let postData = JSON.stringify(this.loginForm);
      this.$refs.loginFormRef.validate(valid=>{
        if(!valid) return;
        this.$axios({
        method:'post',
        url:'login',
        data:postData,
        headers:{'Content-Type':'application/json'}
        }).then(res=>{
          console.log(res.data.data.token)
          if(res.data.meta.status!=200) return this.$message.error(res.data.meta.msg)
          this.$message.success(res.data.meta.msg);
          // 将token保存在sessionStorage中
          window.sessionStorage.setItem('token',res.data.data.token);
          // 登录成功后页面进行跳转
          // alert('1')
          this.$router.push('/home');
        }).catch(function(err){
          console.log(err);
          return this.$message.error('登录失败！')
        });
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../assets/less/Login.less";
</style>
