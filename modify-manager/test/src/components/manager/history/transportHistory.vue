<template>
<div class="contain" :style="{width:screenWidth}">
  <table class="table">
    <tr class="title">
      <th>运输方式</th>
      <th>运输周期</th>
      <th>运输费用</th>
    </tr>
    <tr :key=index v-for="(history,index) in TransportHistory">
      <td>{{history.transportName}}</td>
      <td>{{history.transportPeriod}}</td>
      <td>{{history.transportPrice}}</td>
    </tr>
  </table>
</div>
</template>

<script>
  export default {
    data() {
      return {
        screenWidth: '1349px', // 屏幕尺寸
        TransportHistory: []
      }
    },
    mounted:function(){
    this.showTransportHistory();
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
    showTransportHistory(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/transport/manager/status'+'?enable='+false,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.TransportHistory=response.data.data;
      }).catch(function(err){
        console.log(err);
      });
      },
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/manager/history/transportHistory.less';
</style>
