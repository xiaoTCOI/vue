<template>
<div class="contain" :style="{width:screenWidth}">
  <table class="table">
    <tr class="title">
      <th>产品名称</th>
      <th>研发周期</th>
      <th>研发费用</th>
      <th>生产周期</th>
      <th>生产费用</th>
      <th>产品售价</th>
    </tr>
    <tr :key=index v-for="(history,index) in ProductHistory">
      <td>{{history.productName}}</td>
      <td>{{history.productResearchPeriod}}</td>
      <td>{{history.productResearchCost}}</td>
      <td>{{history.produceProductPeriod}}</td>
      <td>{{history.produceProductCost}}</td>
      <td>{{history.productSellingPrice}}</td>
    </tr>
  </table>
  <table class="table">
    <tr class="title">
      <th>产品名称</th>
      <th>原料名称</th>
      <th>等待周期</th>
      <th>原料价格</th>
      <th>原料数量</th>
    </tr>
    <tr :key=index v-for="(materialHistory,index) in ProductMaterialHistory">
      <td>{{materialHistory.productBasicInfo.productName}}</td>
      <td>{{materialHistory.materialBasicInfo.materialName}}</td>
      <td>{{materialHistory.materialBasicInfo.materialDelayTime}}</td>
      <td>{{materialHistory.materialBasicInfo.materialPrice}}</td>
      <td>{{materialHistory.number}}</td>
    </tr>
  </table>
</div>
</template>


<script>
  export default {
    data() {
      return {
        screenWidth: '1349px', // 屏幕尺寸
        ProductHistory: [],
        ProductMaterialHistory:[]
      }
    },
    mounted:function(){
    this.showProductHistory();
    this.showProductMaterialHistory();
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
    showProductHistory(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/product/manager/status'+'?enable='+false,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.ProductHistory=response.data.data;
      }).catch(function(err){
        console.log(err);
      });
    },
    showProductMaterialHistory(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/product/manager/material/status'+'?enable='+false,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.ProductMaterialHistory=response.data.data;
        console.log(this.ProductMaterialHistory)
      }).catch(function(err){
        console.log(err);
      });
    },
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/manager/history/productHistory.less';
</style>
