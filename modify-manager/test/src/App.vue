<template>
  <div id="app">
    <Header></Header>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
import Header from './components/header'
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  components:{
    Header
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  //刷新页面
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive=true;
      })
    }
  }
}
</script>

<style>
html{
  margin:0;
  padding:0;
  font-size:1rem !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* width: 1366px;
  height: 457px;
  margin: 0; */
  /* background-color: #BCBCBC; */
  /* margin-top: 60px; */
}
</style>
