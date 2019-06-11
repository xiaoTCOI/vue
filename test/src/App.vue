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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #BCBCBC; */
  /* margin-top: 60px; */
}
</style>
