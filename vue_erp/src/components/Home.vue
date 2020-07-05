<template>
  <div class="">
    Home
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
    logout(){
      // 清空token
      window.sessionStorage.clear();
      // 跳转到登录页
      this.$router.push("/login");
    }
  }
}
</script>
<style lang="less" scoped>
</style>
