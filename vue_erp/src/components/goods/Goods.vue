<template>
  <div>
    <!-- 面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <!-- 搜索与添加区域 -->
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <!-- 添加商品 -->
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table表格区 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）" width="100px"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="65px"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="145px">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="125px">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {
       // 查询参数对象
      queryInfo:{
        query:'',
        // 当前的页数
        pagenum:1,
        // 当前每页显示多少条数据
        pagesize:10
      },
      // 商品列表
      goodslist:[],
      total:0,
    }
  },
  components: {},
  created(){
    this.getGoodsList()
  },
  mounted(){},
  methods: {
    // 根据分页获取对的商品列表
    getGoodsList(){
      this.$axios({
        methods:'get',
        url:'goods',
        params:this.queryInfo
      }).then(res=>{
        // console.log(res.data)
        if(res.data.meta.status !== 200)
          return this.$message.error('获取商品列表失败！');
        this.$message.success('获取商品列表成功！')
        this.goodslist = res.data.data.goods;
        this.total = res.data.data.total;
      }).catch(function(err){
        console.log(err);
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize){
      this.queryInfo.pagesize=newSize;
      this.getGoodsList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum=newPage;
      this.getGoodsList();
    },
    // 根据id删除商品
    async removeById(id){
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err=>err)
      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消了删除，则返回值为字符串cancel
      if(confirmResult != 'confirm'){
        return this.$message.info('已取消删除');
      }
      this.$axios.delete('goods/'+id).then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error('删除失败！');
        }
        this.$message.success('删除成功！');
        this.getGoodsList();
      }).catch(err=>err)
    },
    // 点击按钮添加商品
    goAddpage(){
      this.$router.push('/goods/add')
    },
  }
}
</script>
<style lang="less" scoped>
</style>
