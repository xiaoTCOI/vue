<template>
  <div>
    <!-- 心电图 -->
    <div id="heart" style="width:800px; height:600px;"></div>

    <!-- 柱状图 -->
    <!-- <div id="myChart" style="width:1300px; height:600px;"></div> -->

    <!-- 折线图 -->
    <!-- <div id="chartmainline" style="width:1300px; height:600px;"></div> -->

    <!-- 绘制散点图 -->
    <!-- <div id="scatter" style="width:1300px; height:600px;"></div> -->

    <!-- 绘制柱状、折线混合图 -->
    <!-- <div id="bar_line" style="width: 1300px;height:600px;"></div> -->
</div>
</template>

<script>
import $ from 'jquery';
// export default {
//   name: 'HelloWorld',
//   data () {
//     return {
//       msg: 'Welcome to Your Vue.js App'
//     }
//   },
  
  // mounted:html加载完成后执行。执行顺序：子组件-父组件
  // mounted(){
  //   // this.drawLine();
  //   // this.getNewsList();
  // },
  // methods: {
    // drawLine(){
    //     // 基于准备好的dom，初始化echarts实例
    //     let myChart = this.$echarts.init(document.getElementById('myChart'))
    //     // 绘制图表
    //     myChart.setOption({
    //         title: { text: '在Vue中使用echarts' },
    //         tooltip: {},
    //         xAxis: {
    //             data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //         },
    //         yAxis: {},
    //         series: [{
    //             name: '销量',
    //             type: 'bar',
    //             data: [5, 20, 36, 10, 10, 20]
    //         }]
    //     });
    // },

//     getNewsList(){
//       this.axios.get('https://www.easy-mock.com/mock/5c7e9431d811a611ca8c937b/visualization/newdata').then((response)=>{
//         console.log(response.data.elements);
//         var x = [];
//         var y = [];
//         $.each(response.data.elements, function (index, item) {//两个参数，第一个参数表示下标，第二个参数表示一维数组中的每一个数组,遍历二维数组
//                 x.push(item.name);    //挨个取出类别并填入类别数组                    
//                 y.push(item.wish_to_go_count);    //挨个取出销量并填入销量数组
//             });
        
        // 基于准备好的dom，初始化echarts实例
        // 绘制柱状图表
        // let myChart = this.$echarts.init(document.getElementById('myChart'));
        // myChart.setOption({
        //     title: { text: '在Vue中使用echarts' },
        //     tooltip: {},
        //     legend:{},
        //     xAxis: {
        //         data: x
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '模拟数据',
        //         type: 'bar',
        //         data: y
        //     }]
        // });

        //绘制折线图
        // let chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
        // chartmainline.setOption({
        //   title: { text: '在Vue中使用echarts' },
        //     tooltip: {},
        //     legend:{},
        //     xAxis: {
        //         data: x
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '模拟数据',
        //         type: 'line',
        //         data: y
        //     }]
        // });

        //绘制散点图
        // let scatter = this.$echarts.init(document.getElementById("scatter"));
        // scatter.setOption({
        //   title: { text: '在Vue中使用echarts' },
        //     tooltip: {},
        //     legend:{},
        //     xAxis: {
        //         data: x
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '模拟数据',
        //         type: 'scatter',
        //         data: y
        //     }]
        // });

        //绘制柱状、折线混合图
        // 基于准备好的dom，初始化echarts实例
        // var bar_line = this.$echarts.init(document.getElementById('bar_line'));
        // 使用刚指定的配置项和数据显示图表。
      //   bar_line.setOption({
      //     tooltip:{
      //       trigger: 'axis' //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      //     },
      //     legend: {},
      //     xAxis: [
      //       {
      //         type: 'category',
      //         // 坐标轴类型。'value' 数值轴，适用于连续数据。'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
      //         // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期日还是小时范围的刻度。'log' 对数轴。适用于对数数据
      //         data: x
      //       }
      //     ],
      //     yAxis: [{
      //       type: 'value',
      //       name: '数据',//坐标轴名称
      //     }],
      //     series: [
      //       {
      //         name:'柱状',
      //         type:'bar',
      //         //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
      //         itemStyle: {
      //           // normal 是图形在默认状态下的样式
      //           normal: {
      //             /*设置柱状图颜色*/
      //             color: function(params) {
      //                 // build a color map as your need.
      //                 var colorList = [
      //                   '#fe4f4f','#fead33','#feca2b','#fef728','#c5ee4a',
      //                   '#87ee4a','#46eda9','#47e4ed','#4bbbee','#7646d8',
      //                   '#924ae2','#C6E579','#F4E001','#F0805A','#26C0C0',
      //                   '#B2CFEB','#FFE680','#044F7D','#BC9243','#17A05D',
      //                   '#CC2F31','#80FDD2'
      //                 ];
      //                 return colorList[params.dataIndex]
      //             },
      //             /*信息显示方式*/
      //             //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
      //             label: {
      //                 show: true, //是否显示标签
      //                 position: 'top',  //标签的位置
      //                 formatter: '{b}\n{c}' //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
      //             }
      //           }
      //         },
      //         data:y
      //       },
      //       {
      //         name:'折线',
      //         type:'line',
      //         data:y
      //       }
      //     ]
      //   }); 
      // }).catch((response)=>{
      //   console.log(response);
      // })
    // }
  // }
// }
  export default{
    name:'HelloWorld',
    data(){
      return{}
    },
    mounted(){
      this.getHeart();
    },
    methods:{
      getHeart(){
        let heart = this.$echarts.init(document.getElementById('heart'));
        var ws = new WebSocket('ws://118.24.113.182:8081/commonWebSocket?gameId=1');
        ws.onopen = function (event) {
          console.log("已连接");
          // console.log(event.data)
          var j = 0
          var arr=[];
          setInterval(function(){
            var arrNum=parseInt(Math.random()*999)+1;
            // console.log(arrNum)
            // console.log(arr)
            arr.push(arrNum);
            if(arr.length > 50){
              for(var i = 0;i<arr.length;i++){
                arr[i] = arr[i+1];
              }
              arr.pop();
              // console.log(arr)
            }
            ws.send(arr);
          },"500")
          
          // console.log(event)
        };
        ws.onmessage = function (event) {
          var str = event.data;
          var dataArr = str.split(',');
          console.log(dataArr)
          //绘制折线图
          
          heart.setOption({
            animation:false,
            title: { text: '在Vue中使用echarts' },
              tooltip: {},
              legend:{},
              xAxis: {
                name:"x",
                // data: res
                type: 'category',
                boundaryGap: false,
                // min : 0,
                // max : 10,
                data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]
                // splitNumber : 20//分割段数
              },
              yAxis: {
                type:"value",
                name:"随机数据",
                // data: [100,200,300,300,400,500,100,200,300,300,400,500,100,200,300,300,400,500,700,900],
                min : 0,
                max : 1000,
                splitNumber : 20,//分割段数

              },
              series: [{
                name: '模拟数据',
                type: 'line',
                data: dataArr
              }]
          });
        }
        ws.onerror = function (event) {
          console.log("出现错误");
        };
        ws.onclose = function (event) {
          console.log("已关闭")
        };
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
