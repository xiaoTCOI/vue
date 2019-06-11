<template>
  <div class="r-main">
    <el-row class="main">
      <el-col :span="8" :class="block.className" :key="index"  v-for="(block,index) in classArr">
          <!-- <div :class="block.content"  v-on:mouseover="enter(index)" v-on:mouseout="leave()" :style="active"> -->
        <div :class="block.content" onmouseover="this.style.background='#CFDAE5'" onmouseout="this.style.background=''" v-on:click="toIndex(block.content)">
          <h3>{{block.title}}</h3>
          <div class="introduce">
            <p :key="index" v-for="(content,index) in block.introduce">
              <strong>{{content.name}}：</strong>{{content.introduce}}
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
      classArr:[
        {
          className:'block-one',
          content:'iso',
          title:'ISO',
          introduce:[
            {name:'额外价值',introduce:'该认证对订单价格的影响程度，每一个产品价格影响。'},
            {name:'维护成本',introduce:'ISO认证完成后，维持该认证每个周期需要支付的费用。'},
            {name:'ISO名称',introduce:'ISO认证资格的名称。'},
            {name:'研究成本',introduce:'在开拓ISO认证过程中，每个周期需要支付的费用。'},
            {name:'研究时间',introduce:'完成ISO认证所需的周期数。'},
            {name:'认证状态',introduce:'该认证的默认初始状态。'}
        ]},
        {
          className:'block-two',
          content:'market',
          title:'市场',
          introduce:[
            {name:'维护成本',introduce:'市场开发完成后，维持该市场每个周期需要支付的费用。'},
            {name:'市场名称',introduce:'市场的名称。'},
            {name:'研究成本',introduce:'在市场开发过程中，每个周期需要支付的费用。'},
            {name:'研究周期',introduce:'完成市场开发的周期数。'},
            {name:'认证状态',introduce:' 该认证的默认初始状态。'},
        ]},
        {
          className:'block-three',
          content:'material',
          title:'材料',
          introduce:[
            {name:'等待周期',introduce:'指原料从采购开始到原料运到仓库，需要等待的周期数，该值必须大于0。'},
            {name:'原料名称',introduce:'原料的名称，所有相同原料名称数据中。'},
            {name:'原料价格',introduce:'原料的价格,该值必须大于0。'}
        ]},
        {className:'block-four',content:'factory',title:'厂房'},
        {className:'block-five',content:'prodline',title:'生产线'},
        {className:'block-six',content:'product',title:'产品'},
        {
          className:'block-eight',
          content:'transport',
          title:'运输',
          introduce:[
            {name:'运输方式',introduce:'运输方式的名称。（例如：航运、铁运、水运、陆运等）'},
            {name:'运输周期',introduce:'运达所需要的周期数。'},
            {name:'运输费用',introduce:'每周期所需费用。'}
        ]}
      ]
    }
  },
  methods:{
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
