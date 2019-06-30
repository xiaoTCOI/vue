<template>
<div class="contain" :style="{width:screenWidth}">
  <table class="table">
    <tr class="title">
      <th>厂房类型</th>
      <th>建造周期</th>
      <th>建造成本</th>
      <th>折旧价值</th>
      <th>厂房价值</th>
      <th>最低价值</th>
      <th>生产线量</th>
      <th>厂房租金</th>
      <th>交货时间</th>
      <th>维护成本</th>
    </tr>
    <tr :key=index v-for="(history,index) in FactoryHistory">
      <td>{{history.factoryType}}</td>
      <td>{{history.factoryMakePeriod}}</td>
      <td>{{history.factoryMakeCost}}</td>
      <td>{{history.factoryDepreciation}}</td>
      <td>{{history.factoryValue}}</td>
      <td>{{history.factoryStumpCost}}</td>
      <td>{{history.factoryCapacity}}</td>
      <td>{{history.factoryRentCost}}</td>
      <td>{{history.factoryDelayTime}}</td>
      <td>{{history.factoryMaintainCost}}</td>
    </tr>
  </table>
</div>
</template>

<script>
  export default {
    data() {
      return {
        screenWidth: '1349px', // 屏幕尺寸
        FactoryHistory: []
      }
    },
    mounted:function(){
    this.showFactoryHistory();
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
    showFactoryHistory(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/factorymanagement/factory/manager/status'+'?enable='+false,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.FactoryHistory=response.data.data;
      }).catch(function(err){
        console.log(err);
      });
    },
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/manager/history/factoryHistory.less';
</style>
