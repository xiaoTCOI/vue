<template>
  <div class="main">
    <el-row class="row">
      <el-col :span="6" class="transport" :key=index v-for="(item,index) in transport">
        <!-- 展示运输基本信息 -->
        <div class="transport-one">
          <!-- {{index}} -->
          <div>
            <el-tooltip content="关闭运输基本信息" placement="top">
              <el-button type="button" @click="closeTransport(item.id)" class="close" >X</el-button>
            </el-tooltip>
          </div>
          <p>
            <span>运输方式:</span>
            <span>{{item.transportName}}</span>
          </p>
          <p>
            <span>运输周期:</span>
            <span>{{item.transportPeriod}}</span>
          </p>
          <p>
            <span>运输费用:</span>
            <span>{{item.transportPrice}}</span>
          </p>

          <!-- 修改运输基本信息 -->
          <div>
            <el-button class="modify" type="button" @click="clickModify(index,item.id)">修改</el-button>
            <el-dialog title="修改运输基本信息" :visible.sync="modify">
              <el-form>
                <el-form-item :label="inputs[0].inputName" :label-width="formLabelWidth">
                  <el-input v-model="transportName" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item :label="inputs[1].inputName" :label-width="formLabelWidth">
                  <el-input v-model="transportPeriod" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[2].inputName" :label-width="formLabelWidth">
                  <el-input v-model="transportPrice" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="modify = false">取 消</el-button>
                <el-button type="submit" v-on:click="transportModify(id)" >确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="transport">
        <div class="transport-add">
          <!-- 添加运输基本信息-->
          <el-button type="button" @click="dialogFormVisible = true">添加运输基本信息</el-button>
          <el-dialog title="添加运输基本信息" :visible.sync="dialogFormVisible">
            <el-form v-model="inputs">
              <el-form-item :label="input.inputName" :label-width="formLabelWidth" :key="index" v-for="(input,index) in inputs">
                <el-input v-model="input.value" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="submit" @click="addTransport" >确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  inject:['reload'],
  data(){
    return{
      dialogFormVisible: false,
      modify:false,
      formLabelWidth: '120px',
      transportName:null,
      transportPeriod: null,
      transportPrice:null,
      id:0,
      transport:[],
      inputs:[
        {inputName:"运输方式",value:null},
        {inputName:"运输周期",value:null},
        {inputName:"运输费用",value:null}
      ],
    }
  },
  mounted(){

  },
  mounted:function(){
    this.showTransport();
    // alert("1")
  },
  methods:{
    //显示材料基本信息
    showTransport(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/transport/manager/status'+'?enable='+true,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.transport=response.data.data;
      }).catch(function(err){
        console.log(err);
      });
    },

    // 添加运输基本信息
    addTransport(){
      this.dialogFormVisible = false;
      let postData = JSON.stringify({
        transportName: this.inputs[0].value,
        transportPeriod: this.inputs[1].value,
        transportPrice: this.inputs[2].value,
      });
      // console.log(postData)
      //POST
      this.$axios({
        method:"post",
        url:'/game/compete/operation/transport/manager',
        data:postData,
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        for(var i=0;i<this.inputs.length;i++){
          this.inputs[i].value=null;
        }
        this.reload();
        console.log(response);
      }).catch(function(err){
        console.log(err);
      });
    },

    //实现展示的数据填入修改文本框
    clickModify(index,id){
      this.modify = true;
      this.transportName=this.transport[index].transportName;
      this.transportPeriod=this.transport[index].transportPeriod;
      this.transportPrice=this.transport[index].transportPrice;
      // alert(this.id)
      this.id=id;
    },

    //修改运输基本信息
    transportModify(index){
      this.modify=false;
      let putData = {
        'transportName': this.transportName,
        'transportPeriod': this.transportPeriod,
        'transportPrice': this.transportPrice
      };
      // console.log(putData)
      // PUT
      this.$axios.put('/game/compete/operation/transport/manager'+'?transportBasicId='+index,putData,).then(response=>{
        console.log(response.data)
        this.reload();
      }).catch(function(err){
        console.log(err);
      });
    },

    //关闭运输基本信息
    closeTransport(index) {
      this.$confirm('此操作将关闭运输基本信息，关闭后将不能再启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // alert(index)
      this.$axios({
        method:"put",
        url:'/game/compete/operation/transport/manager/close'+'?transportBasicId='+index,
        data:''
      }).then(response=>{
        this.reload();
        console.log(response);
      }).catch(function(err){
        console.log(err);
      });
      this.$message({
          type: 'success',
          message: '关闭成功!'
        });
      }).catch(() => {
      this.$message({
          type: 'info',
          message: '已取消关闭'
        });
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/manager/transport.less';
</style>
