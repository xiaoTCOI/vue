<template>
<div class="contain" :style="{width:screenWidth}">
  <table class="table">
    <tr class="title">
      <th>市场名称</th>
      <th>维护成本</th>
      <th>研究成本</th>
      <th>研究周期</th>
      <th>认证状态</th>
    </tr>
    <tr :key=index v-for="(history,index) in MarketHistory">
      <td>{{history.marketName}}</td>
      <td>{{history.marketMaintainCost}}</td>
      <td>{{history.marketResearchCost}}</td>
      <td>{{history.marketResearchPeriod}}</td>
      <td>{{history.marketStatus}}</td>
    </tr>
  </table>
</div>
</template>


<script>
  export default {
    data() {
      return {
        screenWidth: '1349px', // 屏幕尺寸
        MarketHistory: []
      }
    },
    mounted:function(){
    this.showMarketHistory();
    this.getScreenWidth();
  },
  methods:{
    //获取屏幕宽度
    getScreenWidth(){
      window.screenWidth = document.body.clientWidth;
      this.screenWidth = window.screenWidth+16+'px';

      console.log(this.screenWidth)
    },
    //显示历史记录
    showMarketHistory(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/market/manager/status'+'?enable='+false,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.MarketHistory=response.data.data;
        for(var i=0;i<this.MarketHistory.length;i++){
          if(this.MarketHistory[i].marketStatus=='DEVELOPED'){
            this.MarketHistory[i].marketStatus="认证完成";
          }
          else
            this.MarketHistory[i].marketStatus="未认证";
        }
        // console.log(this.iso)
        // console.log(response.data)
      }).catch(function(err){
        console.log(err);
      });
      },
  }



  }
</script>
<style lang="less" scoped>
@import '../../../assets/manager/history/isoHistory.less';
</style>
