<template>
  <div>
    <!-- 面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import _ from 'lodash'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
  data(){
    return {
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          boundaryGap: false
        }],
        yAxis: [{
          type: 'value'
        }]
      }
    }
  },
  components: {},
  created(){},
  // 此时页面上的元素已被渲染出来
  mounted(){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    this.$axios.get('reports/type/1').then(res=>{
        // console.log(res.data)
        if(res.data.meta.status !== 200)
          return this.$message.error('获取折线图失败！');
        // 准备数据和配置项
        // console.log(res.data.data)
        const result = _.merge(res.data.data,this.options)
        // console.log(result)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(result);
      }).catch(function(err){
        console.log(err);
      })
  },
  methods: {}
}
</script>
<style lang="less" scoped>
</style>
