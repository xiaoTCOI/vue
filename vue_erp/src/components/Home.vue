<template>

  <el-container class="home-container">

    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/image/login.jpg" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 左侧侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区 -->
        <el-menu background-color="#333744" text-color="#fff"
        active-text-color="#409EFF" :unique-opened="true"
        :collapse="isCollapse" :collapse-transition="false"
        :router="true" :default-active="$route.path">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: '',
  data(){
    return {
      // 左侧菜单数据
      menulist:[],
      iconsObj:{
        '125':'iconfont icon-retractyonghuguanli',
        '103':'iconfont icon-retractquanxianguanli',
        '101':'iconfont icon-retractshangpinguanli',
        '102':'iconfont icon-retractdingdanguanli',
        '145':'iconfont icon-retracticon-'
      },
      // 是否折叠
      isCollapse:false
    }

  },
  components: {},
  created(){
    this.getMenuList()
  },
  mounted(){},
  methods: {
    logout(){
      // 清空token
      window.sessionStorage.clear();
      // 跳转到登录页
      this.$router.push("/login");
    },
    // 获取所有菜单
    getMenuList(){
      this.$axios({
        methods:'get',
        url:'menus'
      }).then(res=>{
        console.log(res.data)
        if(res.data.meta.status!=200)
          return this.$message.error(res.data.meta.msg);
        this.menulist = res.data.data;
      }).catch(function(err){
        console.log(err)
      })
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../assets/less/Home.less";
</style>
