<template>
  <div class="main">
    <el-row class="row">
      <el-col :span="8" class="iso" :key=index v-for="(item,index) in iso">
        <!-- 展示ISO -->
        <div class="iso-one">
          <!-- {{index}} -->
          <div>
            <el-tooltip content="关闭ISO认证" placement="top">
              <el-button type="button" @click="closeIso(item.id)" class="close" >X</el-button>
            </el-tooltip>
          </div>
          <p>
            <span>额外价值:</span>
            <span>{{item.extraValue}}</span>
          </p>
          <p>
            <span>维护成本:</span>
            <span>{{item.isoMaintainCost}}</span>
          </p>
          <p>
            <span>ISO名称:</span>
            <span>{{item.isoName}}</span>
          </p>
          <p>
            <span>研究成本:</span>
            <span>{{item.isoResearchCost}}</span>
          </p>
          <p>
            <span>研究时间:</span>
            <span>{{item.isoResearchPeriod}}</span>
          </p>
          <p>
            <span>认证状态:</span>
            <span>{{item.isoStatus}}</span>
          </p>

          <!-- 修改ISO -->
          <div>
            <!-- {{item.id}} -->
            <el-button class="modify" type="button" @click="clickModify(index,item.id)">修改</el-button>
            <el-dialog title="修改ISO认证" :visible.sync="modify">
              <!-- {{index}} -->
              <el-form>
                <el-form-item :label="inputs[0].inputName" :label-width="formLabelWidth">
                  <el-input v-model="extraValue" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item :label="inputs[1].inputName" :label-width="formLabelWidth">
                  <el-input v-model="isoMaintainCost" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item :label="inputs[2].inputName" :label-width="formLabelWidth">
                  <el-input v-model="isoName" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item :label="inputs[3].inputName" :label-width="formLabelWidth">
                  <el-input v-model="isoResearchCost" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item :label="inputs[4].inputName" :label-width="formLabelWidth">
                  <el-input v-model="isoResearchPeriod" autocomplete="off"></el-input>
                </el-form-item>
                <el-radio v-model="isoStatus" label="TODEVELOP">未认证</el-radio>
                <el-radio v-model="isoStatus" label="DEVELOPED">认证完成</el-radio>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="modify = false">取 消</el-button>
                <el-button type="submit" v-on:click="isoModify(id)" >确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="iso">
        <div class="iso-add">
          <!-- 添加ISO认证 -->
          <el-button type="button" @click="dialogFormVisible = true">添加ISO认证</el-button>
          <el-dialog title="添加ISO认证" :visible.sync="dialogFormVisible">
            <el-form v-model="inputs">
              <el-form-item :label="input.inputName" :label-width="formLabelWidth" :key="index" v-for="(input,index) in inputs">
                <el-input v-model="input.value" autocomplete="off"></el-input>
              </el-form-item>
              <el-radio v-model="status" label="TODEVELOP">未认证</el-radio>
              <el-radio v-model="status" label="DEVELOPED">认证完成</el-radio>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="submit" @click="addIso" >确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  inject:['reload'],
  data(){
    return{
      dialogFormVisible: false,
      modify:false,
      formLabelWidth: '120px',
      status: 'TODEVELOP',
      showStatus:"未认证",
      modifyStatus:"未认证",
      extraValue:null,
      isoMaintainCost: null,
      isoName: null,
      isoResearchCost: null,
      isoResearchPeriod: null,
      isoStatus: null,
      id:0,
      iso:[],
      modifyIso:[],
      inputs:[
        {inputName:"额外价值",value:null},
        {inputName:"维护成本",value:null},
        {inputName:"ISO名称",value:null},
        {inputName:"研究成本",value:null},
        {inputName:"研究时间",value:null},
      ],
    }
  },
  mounted(){

  },
  mounted:function(){
    this.showIso();
    // alert("1")
  },
  methods:{
    //显示ISO
    showIso(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/iso/manager/status'+'?enable='+true,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.iso=response.data.data;
        for(var i=0;i<this.iso.length;i++){
          if(this.iso[i].isoStatus=='DEVELOPED'){
            this.iso[i].isoStatus="认证完成";
          }
          else
            this.iso[i].isoStatus="未认证";
        }
        // console.log(this.iso)
        // console.log(response.data)
      }).catch(function(err){
        console.log(err);
      });

     },

    // 添加ISO
    addIso(){
      this.dialogFormVisible = false;
      let postData = JSON.stringify({
        extraValue: this.inputs[0].value,
        isoMaintainCost: this.inputs[1].value,
        isoName: this.inputs[2].value,
        isoResearchCost: this.inputs[3].value,
        isoResearchPeriod: this.inputs[4].value,
        isoStatus: this.status
      });
      // console.log(postData)
      //POST
      this.$axios({
        method:"post",
        url:'/game/compete/operation/iso/manager',
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
// console.log(response.data.data.id)
    },

    //实现展示的数据填入修改文本框
    clickModify(index,id){
      this.modify = true;
      this.extraValue=this.iso[index].extraValue;
      this.isoMaintainCost=this.iso[index].isoMaintainCost;
      this.isoName=this.iso[index].isoName;
      this.isoResearchCost=this.iso[index].isoResearchCost;
      this.isoResearchPeriod=this.iso[index].isoResearchPeriod;
      if(this.iso[index].isoStatus=="未认证")
        this.isoStatus='TODEVELOP';
      else
        this.isoStatus='DEVELOPED';
      this.id=id;
      // alert(this.id)
    },

    //修改ISO
    isoModify(index){
      this.modify=false;
      // alert(this.isoStatus)
      let putData = {
        'extraValue': this.extraValue,
        'isoMaintainCost': this.isoMaintainCost,
        'isoName': this.isoName,
        'isoResearchCost': this.isoResearchCost,
        'isoResearchPeriod': this.isoResearchPeriod,
        'isoStatus': this.isoStatus
      };
      // alert(index)
      console.log(putData)
      // PUT
      this.$axios.put('/game/compete/operation/iso/manager'+'?isoBasicId='+index,putData,).then(response=>{
        // alert(index)
        console.log(response.data)
        // this.showIso();
        this.reload();
        // console.log(response.data.msg)

      }).catch(function(err){
        console.log(err);
      });
     },

    //关闭ISO
    closeIso(index) {
      this.$confirm('此操作将关闭ISO，关闭后将不能再启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // alert(index)
      this.$axios({
        method:"put",
        url:'/game/compete/operation/iso/manager/close'+'?isoBasicId='+index,
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
@import '../../assets/manager/iso.less';
</style>
