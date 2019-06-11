<template>
  <div class="main">
    <el-row class="row">
      <el-col :span="8" class="factory" :key=index v-for="(item,index) in factory">
        <!-- 展示厂房信息 -->
        <div class="factory-one">
          <!-- {{index}} -->
          <div>
            <el-tooltip content="关闭厂房信息" placement="top">
              <el-button type="button" @click="closeFactory(item.id)" class="close" >X</el-button>
            </el-tooltip>
          </div>
          <p>
            <span>厂房类型:</span>
            <span>{{item.factoryType}}</span>
          </p>
          <p>
            <span>厂房建造周期:</span>
            <span>{{item.factoryMakePeriod}}</span>
          </p>
          <p>
            <span>厂房建造成本:</span>
            <span>{{item.factoryMakeCost}}</span>
          </p>
          <p>
            <span>厂房折旧价值:</span>
            <span>{{item.factoryDepreciation}}</span>
          </p>
          <p>
            <span>厂房价值:</span>
            <span>{{item.factoryValue}}</span>
          </p>
          <p>
            <span>厂房最低价值:</span>
            <span>{{item.factoryStumpCost}}</span>
          </p>
          <p>
            <span>厂房生产线量:</span>
            <span>{{item.factoryCapacity}}</span>
          </p>
          <p>
            <span>厂房租金:</span>
            <span>{{item.factoryRentCost}}</span>
          </p>
          <p>
            <span>厂房交货时间:</span>
            <span>{{item.factoryDelayTime}}</span>
          </p>
          <p>
            <span>厂房维护成本:</span>
            <span>{{item.factoryMaintainCost}}</span>
          </p>

          <!-- 修改ISO -->
          <div>
            <!-- {{item.id}} -->
            <el-button class="modify" type="button" @click="clickModify(index,item.id)">修改</el-button>
            <el-dialog title="修改厂房信息" :visible.sync="modify">
              <!-- {{index}} -->
              <el-form>
                <el-form-item :label="inputs[0].inputName" :label-width="formLabelWidth">
                  <el-input v-model="factoryType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[1].inputName" :label-width="formLabelWidth">
                  <el-input v-model="factoryMakePeriod" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[2].inputName" :label-width="formLabelWidth">
                  <el-input v-model="factoryMakeCost" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[3].inputName" :label-width="formLabelWidth">
                  <el-input v-model="factoryDepreciation" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[4].inputName" :label-width="formLabelWidth">
                  <el-input v-model="factoryValue" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[5].inputName" :label-width="formLabelWidth">
                  <el-input v-model="factoryStumpCost" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[6].inputName" :label-width="formLabelWidth">
                  <el-input v-model="factoryCapacity" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[7].inputName" :label-width="formLabelWidth">
                  <el-input v-model="factoryRentCost" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[8].inputName" :label-width="formLabelWidth">
                  <el-input v-model="factoryDelayTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[9].inputName" :label-width="formLabelWidth">
                  <el-input v-model="factoryMaintainCost" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="modify = false">取 消</el-button>
                <el-button type="submit" v-on:click="factoryModify(id)" >确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="factory">
        <div class="factory-add">
          <!-- 添加厂房信息 -->
          <el-button type="button" @click="dialogFormVisible = true">添加厂房信息</el-button>
          <el-dialog title="添加厂房信息" :visible.sync="dialogFormVisible">
            <el-form v-model="inputs">
              <el-form-item :label="input.inputName" :label-width="formLabelWidth" :key="index" v-for="(input,index) in inputs">
                <el-input v-model="input.value" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="submit" @click="addFactory" >确 定</el-button>
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
      factoryType: null,
      factoryMakePeriod: null,
      factoryMakeCost: null,
      factoryDepreciation: null,
      factoryValue: null,
      factoryStumpCost: null,
      factoryCapacity: null,
      factoryRentCost: null,
      factoryDelayTime: null,
      factoryMaintainCost: null,
      id:0,
      factory:[],
      inputs:[
        {inputName:"厂房类型",value:null},
        {inputName:"厂房建造周期",value:null},
        {inputName:"厂房建造成本",value:null},
        {inputName:"厂房折旧价值",value:null},
        {inputName:"厂房价值",value:null},
        {inputName:"厂房最低价值",value:null},
        {inputName:"厂房生产线量",value:null},
        {inputName:"厂房租金",value:null},
        {inputName:"厂房交货时间",value:null},
        {inputName:"厂房维护成本",value:null}
      ],
    }
  },
  mounted:function(){
    this.showFactory();
    // alert("1")
  },
  methods:{
    //显示厂房信息
    showFactory(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/factorymanagement/factory/manager/status'+'?enable='+true,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.factory=response.data.data;
        // console.log(this.iso)
        // console.log(response.data)
      }).catch(function(err){
        console.log(err);
      });

     },

    // 添加厂房信息
    addFactory(){
      this.dialogFormVisible = false;
      let postData = JSON.stringify({
        factoryType: this.inputs[0].value,
        factoryMakePeriod: this.inputs[1].value,
        factoryMakeCost: this.inputs[2].value,
        factoryDepreciation: this.inputs[3].value,
        factoryValue: this.inputs[4].value,
        factoryStumpCost: this.inputs[5].value,
        factoryCapacity: this.inputs[6].value,
        factoryRentCost: this.inputs[7].value,
        factoryDelayTime: this.inputs[8].value,
        factoryMaintainCost: this.inputs[9].value
      });
      // console.log(postData)
      //POST
      this.$axios({
        method:"post",
        url:'/game/compete/operation/factorymanagement/factory/manager',
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
      this.factoryType=this.factory[index].factoryType;
      this.factoryMakePeriod=this.factory[index].factoryMakePeriod;
      this.factoryMakeCost=this.factory[index].factoryMakeCost;
      this.factoryDepreciation=this.factory[index].factoryDepreciation;
      this.factoryValue=this.factory[index].factoryValue;
      this.factoryStumpCost=this.factory[index].factoryStumpCost;
      this.factoryCapacity=this.factory[index].factoryCapacity;
      this.factoryRentCost=this.factory[index].factoryRentCost;
      this.factoryDelayTime=this.factory[index].factoryDelayTime;
      this.factoryMaintainCost=this.factory[index].factoryMaintainCost;
      this.id=id;
      // alert(this.id)
    },

    //修改厂房信息
    factoryModify(index){
      this.modify=false;
      // alert(this.isoStatus)
      let putData = {
        'factoryType': this.factoryType,
        'factoryMakePeriod': this.factoryMakePeriod,
        'factoryMakeCost': this.factoryMakeCost,
        'factoryDepreciation': this.factoryDepreciation,
        'factoryValue': this.factoryValue,
        'factoryStumpCost': this.factoryStumpCost,
        'factoryCapacity': this.factoryCapacity,
        'factoryRentCost': this.factoryRentCost,
        'factoryDelayTime': this.factoryDelayTime,
        'factoryMaintainCost': this.factoryMaintainCost
      };
      // alert(index)
      console.log(putData)
      // PUT
      this.$axios.put('/game/compete/operation/factorymanagement/factory/manager'+'?factoryBasicId='+index,putData,).then(response=>{
        // alert(index)
        console.log(response.data)
        // this.showIso();
        this.reload();
        // console.log(response.data.msg)

      }).catch(function(err){
        console.log(err);
      });
     },

    //关闭厂房信息
    closeFactory(index) {
      this.$confirm('此操作将关闭厂房信息，关闭后将不能再启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // alert(index)
      this.$axios({
        method:"put",
        url:'/game/compete/operation/factorymanagement/factory/manager/close'+'?factoryBasicId='+index,
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
@import '../../assets/manager/factory.less';
</style>
