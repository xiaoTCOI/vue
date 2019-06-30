<template>
<div class="contain" :style="{width:screenWidth}">
  <table class="table">
    <tr class="title">
      <th>ISO名称</th>
      <th>额外价值</th>
      <th>维护成本</th>
      <th>研究成本</th>
      <th>研究时间</th>
      <th>认证状态</th>
    </tr>
    <tr :key=index v-for="(history,index) in isoHistory">
      <td>{{history.isoName}}</td>
      <td>{{history.extraValue}}</td>
      <td>{{history.isoMaintainCost}}</td>
      <td>{{history.isoResearchCost}}</td>
      <td>{{history.isoResearchPeriod}}</td>
      <td>{{history.isoStatus}}</td>
    </tr>
  </table>
</div>
</template>


<script>
  export default {
    data() {
      return {
        screenWidth: '1349px', // 屏幕尺寸
        isoHistory: []
      }
    },
    mounted:function(){
    this.showIsoHistory();
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
    showIsoHistory(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/iso/manager/status'+'?enable='+false,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.isoHistory=response.data.data;
        for(var i=0;i<this.isoHistory.length;i++){
          if(this.isoHistory[i].isoStatus=='DEVELOPED'){
            this.isoHistory[i].isoStatus="认证完成";
          }
          else
            this.isoHistory[i].isoStatus="未认证";
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
