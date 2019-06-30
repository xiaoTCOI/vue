<template>
<div class="contain" :style="{width:screenWidth}">
  <table class="table">
    <tr class="title">
      <th>原料名称</th>
      <th>等待周期</th>
      <th>原料价格</th>
    </tr>
    <tr :key=index v-for="(history,index) in MaterialHistory">
      <td>{{history.materialName}}</td>
      <td>{{history.materialDelayTime}}</td>
      <td>{{history.materialPrice}}</td>
    </tr>
  </table>
</div>
</template>


<script>
  export default {
    data() {
      return {
        screenWidth: '1349px', // 屏幕尺寸
        MaterialHistory: []
      }
    },
    mounted:function(){
    this.showMaterialHistory();
    this.getScreenWidth();
  },
  methods:{
    //获取屏幕宽度
    getScreenWidth(){
      window.screenWidth = document.body.clientWidth;
      this.screenWidth = window.screenWidth+16+'px';

      // console.log(this.screenWidth)
    },
    //显示历史记录
    showMaterialHistory(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/material/manager/status'+'?enable='+false,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.MaterialHistory=response.data.data;
      }).catch(function(err){
        console.log(err);
      });
      },
  }



  }
</script>
<style lang="less" scoped>
@import '../../../assets/manager/history/materialHistory.less';
</style>
