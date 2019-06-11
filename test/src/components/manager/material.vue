<template>
  <div class="main">
    <el-row class="row">
      <el-col :span="6" class="material" :key=index v-for="(item,index) in material">
        <!-- 展示材料基本信息 -->
        <div class="material-one">
          <!-- {{index}} -->
          <div>
            <el-tooltip content="关闭材料基本信息" placement="top">
              <el-button type="button" @click="closeMaterial(item.id)" class="close" >X</el-button>
            </el-tooltip>
          </div>
          <p>
            <span>等待周期:</span>
            <span>{{item.materialDelayTime}}</span>
          </p>
          <p>
            <span>原料名称:</span>
            <span>{{item.materialName}}</span>
          </p>
          <p>
            <span>原料价格:</span>
            <span>{{item.materialPrice}}</span>
          </p>

          <!-- 修改材料基本信息 -->
          <div>
            <el-button class="modify" type="button" @click="clickModify(index,item.id)">修改</el-button>
            <el-dialog title="修改材料基本信息" :visible.sync="modify">
              <el-form>
                <el-form-item :label="inputs[0].inputName" :label-width="formLabelWidth">
                  <el-input v-model="materialDelayTime" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item :label="inputs[1].inputName" :label-width="formLabelWidth">
                  <el-input v-model="materialName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[2].inputName" :label-width="formLabelWidth">
                  <el-input v-model="materialPrice" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="modify = false">取 消</el-button>
                <el-button type="submit" v-on:click="materialModify(id)" >确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="material">
        <div class="material-add">
          <!-- 添加材料基本信息-->
          <el-button type="button" @click="dialogFormVisible = true">添加材料</el-button>
          <el-dialog title="添加材料基本信息" :visible.sync="dialogFormVisible">
            <el-form v-model="inputs">
              <el-form-item :label="input.inputName" :label-width="formLabelWidth" :key="index" v-for="(input,index) in inputs">
                <el-input v-model="input.value" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="submit" @click="addMaterial" >确 定</el-button>
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
      materialDelayTime:null,
      materialName: null,
      materialPrice:null,
      id:0,
      material:[],
      inputs:[
        {inputName:"等待周期",value:null},
        {inputName:"原料名称",value:null},
        {inputName:"原料价格",value:null}
      ],
    }
  },
  mounted(){

  },
  mounted:function(){
    this.showMaterial();
    // alert("1")
  },
  methods:{
    //显示材料基本信息
    showMaterial(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/material/manager/status'+'?enable='+true,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.material=response.data.data;
      }).catch(function(err){
        console.log(err);
      });

     },

    // 添加材料基本信息
    addMaterial(){
      this.dialogFormVisible = false;
      let postData = JSON.stringify({
        materialDelayTime: this.inputs[0].value,
        materialName: this.inputs[1].value,
        materialPrice: this.inputs[2].value,
      });
      // console.log(postData)
      //POST
      this.$axios({
        method:"post",
        url:'/game/compete/operation/material/manager',
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
      this.materialDelayTime=this.material[index].materialDelayTime;
      this.materialName=this.material[index].materialName;
      this.materialPrice=this.material[index].materialPrice;
      // alert(this.id)
      this.id=id;
    },

    //修改材料基本信息
    materialModify(index){
      this.modify=false;
      let putData = {
        'materialDelayTime': this.materialDelayTime,
        'materialName': this.materialName,
        'materialPrice': this.materialPrice
      };
      // console.log(putData)
      // PUT
      this.$axios.put('/game/compete/operation/material/manager'+'?materialBasicId='+index,putData,).then(response=>{
        console.log(response.data)
        this.reload();
      }).catch(function(err){
        console.log(err);
      });
    },

    //关闭材料基本信息
    closeMaterial(index) {
      this.$confirm('此操作将关闭材料基本信息，关闭后将不能再启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // alert(index)
      this.$axios({
        method:"put",
        url:'/game/compete/operation/material/manager/close'+'?materialBasicId='+index,
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
@import '../../assets/manager/material.less';
</style>
