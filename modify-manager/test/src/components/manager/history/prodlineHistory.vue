<template>
<div class="contain" :style="{width:screenWidth}">
  <table class="table">
    <tr class="title">
      <th>生产线类型</th>
      <th>价格</th>
      <th>周期</th>
      <th>变更周期</th>
      <th>变更价格</th>
      <th>成本</th>
      <th>折旧价值</th>
      <th>最低价值</th>
      <th>价值</th>
      <th>额外价值</th>
      <th>额外周期</th>
    </tr>
    <tr :key=index v-for="(history,index) in ProdlineHistory">
      <td>{{history.prodlineType}}</td>
      <td>{{history.prodlineSetupPeriodPrice}}</td>
      <td>{{history.prodlineSetupPeriod}}</td>
      <td>{{history.prodlineChangePeriod}}</td>
      <td>{{history.prodlineChangeCost}}</td>
      <td>{{history.prodlineMainCost}}</td>
      <td>{{history.prodlineDepreciation}}</td>
      <td>{{history.prodlineStumpcost}}</td>
      <td>{{history.prodlineValue}}</td>
      <td>{{history.extraValue}}</td>
      <td>{{history.extraPeriod}}</td>
    </tr>
  </table>
</div>
</template>

<script>
  export default {
    data() {
      return {
        screenWidth: '1349px', // 屏幕尺寸
        ProdlineHistory: []
      }
    },
    mounted:function(){
    this.showProdlineHistory();
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
    showProdlineHistory(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/factorymanagement/prodline/manager/status'+'?enable='+false,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.ProdlineHistory=response.data.data;
        console.log(this.ProdlineHistory)
      }).catch(function(err){
        console.log(err);
      });
      },
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/manager/history/prodlineHistory.less';
</style>
