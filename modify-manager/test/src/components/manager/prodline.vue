<template>
  <div class="main">
    <el-row class="row" :style="{width:screenWidth}">
      <el-col :span="8" class="prodline" :key=index v-for="(item,index) in prodline">
        <!-- 展示生产线信息 -->
        <div class="prodline-one">
          <!-- {{index}} -->
          <div>
            <el-tooltip content="关闭生产线信息" placement="top">
              <el-button type="button" @click="closeProdline(item.id)" class="close" >X</el-button>
            </el-tooltip>
          </div>
          <h3 class="title">{{item.prodlineType}}</h3>
          <!-- <p>
            <span>生产线类型:</span>
            <span>{{item.prodlineType}}</span>
          </p> -->
          <p>
            <span>价格:</span>
            <span>{{item.prodlineSetupPeriodPrice}}</span>
          </p>
          <p>
            <span>周期:</span>
            <span>{{item.prodlineSetupPeriod}}</span>
          </p>
          <p>
            <span>变更周期:</span>
            <span>{{item.prodlineChangePeriod}}</span>
          </p>
          <p>
            <span>变更价格:</span>
            <span>{{item.prodlineChangeCost}}</span>
          </p>
          <p>
            <span>成本:</span>
            <span>{{item.prodlineMainCost}}</span>
          </p>
          <p>
            <span>折旧价值:</span>
            <span>{{item.prodlineDepreciation}}</span>
          </p>
          <p>
            <span>最低价值:</span>
            <span>{{item.prodlineStumpcost}}</span>
          </p>
          <p>
            <span>价值:</span>
            <span>{{item.prodlineValue}}</span>
          </p>
          <p>
            <span>额外价值:</span>
            <span>{{item.extraValue}}</span>
          </p>
          <p>
            <span>额外周期:</span>
            <span>{{item.extraPeriod}}</span>
          </p>

          <!-- 修改生产线信息-->
          <div>
            <!-- {{item.id}} -->
            <el-button class="modify" type="button" @click="clickModify(index,item.id)">修改</el-button>
            <el-dialog title="修改生产线信息" :visible.sync="modify">
              <!-- {{index}} -->
              <el-form>
                <el-form-item :label="inputs[0].inputName" :label-width="formLabelWidth">
                  <el-input v-model="prodlineType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[1].inputName" :label-width="formLabelWidth">
                  <el-input v-model="prodlineSetupPeriodPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[2].inputName" :label-width="formLabelWidth">
                  <el-input v-model="prodlineSetupPeriod" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[3].inputName" :label-width="formLabelWidth">
                  <el-input v-model="prodlineChangePeriod" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[4].inputName" :label-width="formLabelWidth">
                  <el-input v-model="prodlineChangeCost" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[5].inputName" :label-width="formLabelWidth">
                  <el-input v-model="prodlineMainCost" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[6].inputName" :label-width="formLabelWidth">
                  <el-input v-model="prodlineDepreciation" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[7].inputName" :label-width="formLabelWidth">
                  <el-input v-model="prodlineStumpcost" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[8].inputName" :label-width="formLabelWidth">
                  <el-input v-model="prodlineValue" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[9].inputName" :label-width="formLabelWidth">
                  <el-input v-model="extraValue" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="inputs[10].inputName" :label-width="formLabelWidth">
                  <el-input v-model="extraPeriod" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="modify = false">取 消</el-button>
                <el-button type="submit" v-on:click="prodlineModify(id)" >确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="prodline">
        <div class="prodline-add">
          <!-- 添加生产线信息 -->
          <el-button type="button" @click="dialogFormVisible = true">添加生产线信息</el-button>
          <el-dialog title="添加生产线信息" :visible.sync="dialogFormVisible">
            <el-form v-model="inputs">
              <el-form-item :label="input.inputName" :label-width="formLabelWidth" :key="index" v-for="(input,index) in inputs">
                <el-input v-model="input.value" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="submit" @click="addProdline" >确 定</el-button>
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
      screenWidth: '1349px', // 屏幕尺寸
      dialogFormVisible: false,
      modify:false,
      formLabelWidth: '120px',
      prodlineType: null,
      prodlineSetupPeriodPrice: null,
      prodlineSetupPeriod: null,
      prodlineChangePeriod: null,
      prodlineChangeCost: null,
      prodlineMainCost: null,
      prodlineDepreciation: null,
      prodlineStumpcost: null,
      prodlineValue: null,
      extraValue: null,
      extraPeriod: null,
      id:0,
      prodline:[],
      inputs:[
        {inputName:"生产线类型",value:null},
        {inputName:"价格",value:null},
        {inputName:"周期",value:null},
        {inputName:"变更周期",value:null},
        {inputName:"变更价格",value:null},
        {inputName:"成本",value:null},
        {inputName:"折旧价值",value:null},
        {inputName:"最低价值",value:null},
        {inputName:"价值",value:null},
        {inputName:"额外价值",value:null},
        {inputName:"额外周期",value:null}
      ],
    }
  },
  mounted:function(){
    this.showProdline();
    this.getScreenWidth();
    // alert("1")
  },
  methods:{
    //获取屏幕宽度
    getScreenWidth(){
      window.screenWidth = document.body.clientWidth;
      this.screenWidth = window.screenWidth+16+'px';
    },

    //显示生产线信息
    showProdline(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/factorymanagement/prodline/manager/status'+'?enable='+true,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.prodline=response.data.data;
        // console.log(this.iso)
        // console.log(response.data)
      }).catch(function(err){
        console.log(err);
      });

     },

    // 添加生产线信息
    addProdline(){
      this.dialogFormVisible = false;
      let postData = JSON.stringify({
        prodlineType: this.inputs[0].value,
        prodlineSetupPeriodPrice: this.inputs[1].value,
        prodlineSetupPeriod: this.inputs[2].value,
        prodlineChangePeriod: this.inputs[3].value,
        prodlineChangeCost: this.inputs[4].value,
        prodlineMainCost: this.inputs[5].value,
        prodlineDepreciation: this.inputs[6].value,
        prodlineStumpcost: this.inputs[7].value,
        prodlineValue: this.inputs[8].value,
        extraValue: this.inputs[9].value,
        extraPeriod: this.inputs[10].value
      });
      // console.log(postData)
      //POST
      this.$axios({
        method:"post",
        url:'/game/compete/operation/factorymanagement/prodline/manager',
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
      this.prodlineType=this.prodline[index].prodlineType;
      this.prodlineSetupPeriodPrice=this.prodline[index].prodlineSetupPeriodPrice;
      this.prodlineSetupPeriod=this.prodline[index].prodlineSetupPeriod;
      this.prodlineChangePeriod=this.prodline[index].prodlineChangePeriod;
      this.prodlineChangeCost=this.prodline[index].prodlineChangeCost;
      this.prodlineMainCost=this.prodline[index].prodlineMainCost;
      this.prodlineDepreciation=this.prodline[index].prodlineDepreciation;
      this.prodlineStumpcost=this.prodline[index].prodlineStumpcost;
      this.prodlineValue=this.prodline[index].prodlineValue;
      this.extraValue=this.prodline[index].extraValue;
      this.extraPeriod=this.prodline[index].extraPeriod;
      this.id=id;
      // alert(this.id)
    },

    //修改生产线信息
    prodlineModify(index){
      this.modify=false;
      // alert(this.isoStatus)
      let putData = {
        'prodlineType': this.prodlineType,
        'prodlineSetupPeriodPrice': this.prodlineSetupPeriodPrice,
        'prodlineSetupPeriod': this.prodlineSetupPeriod,
        'prodlineChangePeriod': this.prodlineChangePeriod,
        'prodlineChangeCost': this.prodlineChangeCost,
        'prodlineMainCost': this.prodlineMainCost,
        'prodlineDepreciation': this.prodlineDepreciation,
        'prodlineStumpcost': this.prodlineStumpcost,
        'prodlineValue': this.prodlineValue,
        'extraValue': this.extraValue,
        'extraPeriod': this.extraPeriod,
      };
      // alert(index)
      console.log(putData)
      // PUT
      this.$axios.put('/game/compete/operation/factorymanagement/prodline/manager'+'?prodlineBasicId='+index,putData,).then(response=>{
        // alert(index)
        console.log(response.data)
        // this.showIso();
        this.reload();
        // console.log(response.data.msg)

      }).catch(function(err){
        console.log(err);
      });
     },

    //关闭生产线信息
    closeProdline(index) {
      this.$confirm('此操作将关闭生产线信息，关闭后将不能再启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // alert(index)
      this.$axios({
        method:"put",
        url:'/game/compete/operation/factorymanagement/prodline/manager/close'+'?prodlineBasicId='+index,
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
@import '../../assets/manager/prodline.less';
</style>
