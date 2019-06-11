<template>
  <el-col :span="24" class="header">
    <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
      {{collapsed?'':sysName}}
    </el-col>
    <el-col :span="10">
      <!-- @click.prevent 阻止事件的默认行为， -->
      <div class="tools">
        {{this.$route.name}}
      </div>
    </el-col>
    <el-col :span="4" class="userinfo">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-col>
</template>
<script>
export default {
  data(){
    return{
      sysName:'ERP管理端',
			collapsed:false,
			sysUserName: 'TT',
			sysUserAvatar: ''
    }
  },
  methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {
				});
      },

      //折叠导航栏
			// collapse:function(){
			// 	this.collapsed=!this.collapsed;
			// },
  },
  mounted() {
    var user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || '';
      this.sysUserAvatar = user.avatar || '';
    }

  }
}
</script>

<style scoped lang="less" >
	@import '../assets/header.less';
</style>
