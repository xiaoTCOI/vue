<template>
  <div class="r-main" :style="{width:screenWidth}">
    <el-row class="main">
      <el-col :span="6" :class="block.className" :key="index"  v-for="(block,index) in classArr">
          <!-- <div :class="block.content"  v-on:mouseover="enter(index)" v-on:mouseout="leave()" :style="active"> -->
        <div :class="block.content" onmouseover="this.style.background='#CFDAE5'" onmouseout="this.style.background=''" v-on:click="toIndex(block.content)">
          <h3>{{block.title}}</h3>
          <div class="introduce">{{block.introduce}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
      screenWidth: '1349px', // 屏幕尺寸
      classArr:[
        {
          className:'block-one',
          content:'iso',
          title:'ISO',
          introduce:'该模块主要用于添加、修改iso认证信息，该信息可用于为订单增加附加价值'
        },
        {
          className:'block-two',
          content:'market',
          title:'市场',
          introduce:'该模块主要用于添加、修改市场信息，根据生产部门的预计生产量、商品库存数、产品在市场的销售量和销售单价预测等情况,为产品选择合适的广告投放市场和投放量。'
        },
        {
          className:'block-three',
          content:'material',
          title:'材料',
          introduce:'该模块主要用于添加、修改材料信息'
        },
        {
          className:'block-four',
          content:'factory',
          title:'厂房',
          introduce:'该模块主要用于添加、修改厂房信息'
        },
        {
          className:'block-five',
          content:'prodline',
          title:'生产线',
          introduce:'该模块主要用于添加、修改生产线信息'
        },
        {
          className:'block-six',
          content:'product',
          title:'产品',
          introduce:'该模块主要用于添加、修改产品信息'
        },
        {
          className:'block-eight',
          content:'transport',
          title:'运输',
          introduce:'该模块主要用于修改运输信息'
        }
      ]
    }
  },
  mounted:function(){
    this.getScreenWidth();
  },

  methods:{
    //获取屏幕宽度
    getScreenWidth(){
      window.screenWidth = document.body.clientWidth;
      this.screenWidth = window.screenWidth+16+'px';
    },
    //跳转页面
    toIndex(url){
      // alert(url)
      this.$router.push("/manager/"+ url);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/r-manager.less';
</style>
