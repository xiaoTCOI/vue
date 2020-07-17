<template>
  <div>
    <!-- 面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row>
        <!-- 搜索与添加区域 -->
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 订单列表区 -->
      <el-table :data="orderlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <template>{{scope.row.is_send}}</template>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showBox(scope.row.order_id)"></el-button>

            <!-- 地址按钮 -->
            <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10 , 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>

    <!-- 修改地址对话框 -->
    <el-dialog title="修改地址" :visible.sync="addressVisible"
    width="50%" @close="addressDialogClosed">
      <!-- 内容主体区 -->
      <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrderInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 展示物流进度对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressVisible"
    width="50%">
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
  import cityData from './citydata.js'
export default {
  data(){
    return {
      // 获取列表的对象
      queryInfo:{
        query:'',
        // 当前的页数
        pagenum:1,
        // 当前每页显示多少条数据
        pagesize:10
      },
      orderlist:[],
      total:0,
      addressVisible:false,
      addressForm:{
        address1:[],
        address2:''
      },
      addressFormRules:{
        address1:[
          {
            required:true,
            message:'请选择省市区县',
            trigger:'blur'
          }
        ],
        address2:[
          {
            required:true,
            message:'请填写详细地址',
            trigger:'blur'
          },
        ]
      },
      cityData,
      editForm:{},
      progressVisible:false,
      progressInfo:[]
    }
  },
  created(){
    this.getOrderList()
  },
  methods: {
    getOrderList(){
      this.$axios({
        methods:'get',
        url:'orders',
        params:this.queryInfo
      }).then(res=>{
        // console.log(res.data)
        if(res.data.meta.status !== 200)
          return this.$message.error('获取订单数据失败！');
        this.orderlist = res.data.data.goods;
        this.total = res.data.data.total;

      }).catch(function(err){
        console.log(err);
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize){
      this.queryInfo.pagesize=newSize;
      this.getOrderList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum=newPage;
      this.getOrderList();
    },
    // 展示编辑地址的对话框
    showBox(id){
      this.$axios.get('orders/' + id).then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error(res.data.meta.msg);
        }
        this.editForm = res.data.data;
        this.addressVisible=true;
      }).catch(err=>{
        console.log(err);
      })
    },
    // 监听修改对话框的关闭事件
    addressDialogClosed(){
      this.$refs.addressFormRef.resetFields();
    },
    // 修改信息并提交
    editOrderInfo(){
      this.$refs.addressFormRef.validate(valid=>{
        if(!valid) return;
        // 发起信息请求
        this.$axios.put('orders/'+this.editForm.order_id,this.editForm).then(res=>{
          if(res.data.meta.status !== 201){
            return this.$message.error(res.data.meta.msg);
          }
          // 关闭对话框
          this.addressVisible = false;
          // 刷新数据列表
          this.getOrderList();
          // 提示修改成功
          this.$message.success(res.data.meta.msg)
        }).catch(err=>err)
      })
    },
    showProgressBox(){
      this.$axios.get('kuaidi/804909574412544580').then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error('获取物流信息失败！');
        }
        this.progressInfo = res.data.data;
        this.progressVisible = true
      }).catch(err=>{
        console.log(err);
      })

    }
  }
}
</script>
<style lang="less" scoped>
  .el-cascader{
    width: 100%;
  }
</style>
