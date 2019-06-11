<template>
  <div class="main">
    <el-row class="row">
      <el-col :span="8" class="market" :key=index v-for="(item,index) in market">
        <!-- 展示市场基本信息 -->
        <div class="market-one">
          <!-- {{index}} -->
          <div>
            <el-tooltip content="关闭市场基本信息" placement="top">
              <el-button type="button" @click="closeMarket(item.id)" class="close" >X</el-button>
            </el-tooltip>

          </div>
          <p>
            <span>维护成本:</span>
            <span>{{item.marketMaintainCost}}</span>
          </p>
          <p>
            <span>市场名称:</span>
            <span>{{item.marketName}}</span>
          </p>
          <p>
            <span>研究成本:</span>
            <span>{{item.marketResearchCost}}</span>
          </p>
          <p>
            <span>研究周期:</span>
            <span>{{item.marketResearchPeriod}}</span>
          </p>
          <p>
            <span>认证状态:</span>
            <span>{{item.marketStatus}}</span>
          </p>

          <!-- 修改市场基本信息 -->
          <div>
            <el-button class="modify" type="button" @click="clickModify(index,item.id)">修改</el-button>
            <el-dialog title="修改市场基本信息" :visible.sync="modify">
              <el-form>
                <el-form-item label="维护成本" :label-width="formLabelWidth">
                  <el-input v-model="marketMaintainCost" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="市场名称" :label-width="formLabelWidth">
                  <el-select v-model="marketName" placeholder="请选择活动区域" style="width:100%">
                    <el-option label="本地市场" value="localMarket"></el-option>
                    <el-option label="区域市场" value="regionalMarket"></el-option>
                    <el-option label="国内市场" value="domesticMarket"></el-option>
                    <el-option label="国际市场" value="internationalMarket"></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="研究成本" :label-width="formLabelWidth">
                  <el-input v-model="marketResearchCost" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="研究周期" :label-width="formLabelWidth">
                  <el-input v-model="marketResearchPeriod" autocomplete="off"></el-input>
                </el-form-item>
                <el-radio v-model="marketStatus" label="TODEVELOP">未认证</el-radio>
                <el-radio v-model="marketStatus" label="DEVELOPED">认证完成</el-radio>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="modify = false">取 消</el-button>
                <el-button type="submit" v-on:click="marketModify(id)" >确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="market">
        <div class="market-add">
          <!-- 添加市场基本信息-->
          <el-button type="button" @click="dialogFormVisible = true">添加市场</el-button>
          <el-dialog title="添加市场" :visible.sync="dialogFormVisible">
            <el-form v-model="inputs">
              <el-form-item label="市场名称" :label-width="formLabelWidth">
                <el-select v-model="inputMarketName" placeholder="请选择市场" style="width:100%">
                  <el-option label="本地市场" value="本地市场"></el-option>
                  <el-option label="区域市场" value="区域市场"></el-option>
                  <el-option label="国内市场" value="国内市场"></el-option>
                  <el-option label="国际市场" value="国际市场"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="input.inputName" :label-width="formLabelWidth" :key="index" v-for="(input,index) in inputs">
                <el-input v-model="input.value" autocomplete="off"></el-input>
              </el-form-item>
              <el-radio v-model="status" label="TODEVELOP">未认证</el-radio>
              <el-radio v-model="status" label="DEVELOPED">认证完成</el-radio>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="submit" @click="addMarket" >确 定</el-button>
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
      marketMaintainCost: null,
      marketName: null,
      marketResearchCost: null,
      marketResearchPeriod: null,
      marketStatus: null,
      inputMarketName:'',
      id:0,
      market:[],
      inputs:[
        {inputName:"维护成本",value:null},
        // {inputName:"市场名称 ",value:null},
        {inputName:"研究成本",value:null},
        {inputName:"研究周期",value:null},
      ],
      titles:[
        {inputName:"维护成本"},
        {inputName:"研究成本"},
        {inputName:"研究周期"},
      ]
    }
  },
  mounted(){

  },
  mounted:function(){
    this.showMarket();
    // alert("1")
  },
  methods:{
    //显示市场基本信息
    showMarket(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/market/manager/status'+'?enable='+true,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.market=response.data.data;
        for(var i=0;i<this.market.length;i++){
          if(this.market[i].marketStatus=='DEVELOPED'){
            this.market[i].marketStatus="认证完成";
          }
          else
            this.market[i].marketStatus="未认证";
        }
      }).catch(function(err){
        console.log(err);
      });

     },

    // 添加市场基本信息
    addMarket(){
      this.dialogFormVisible = false;
      let postData = JSON.stringify({
        marketMaintainCost: this.inputs[0].value,
        marketName: this.inputMarketName,
        marketResearchCost: this.inputs[1].value,
        marketResearchPeriod: this.inputs[2].value,
        marketStatus: this.status
      });
      console.log(postData)
      //POST
      this.$axios({
        method:"post",
        url:'/game/compete/operation/market/manager',
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
      this.marketMaintainCost=this.market[index].marketMaintainCost;
      this.marketName=this.market[index].marketName;
      this.marketResearchCost=this.market[index].marketResearchCost;
      this.marketResearchPeriod=this.market[index].marketResearchPeriod;
      if(this.market[index].marketStatus=="未认证")
        this.marketStatus='TODEVELOP';
      else
        this.marketStatus='DEVELOPED';
      this.id=id;
      // alert(this.id)
    },

    //修改市场基本信息
     marketModify(index){
      this.modify=false;
      // alert(this.isoStatus)
      let putData = {
        'marketMaintainCost': this.marketMaintainCost,
        'marketName': this.marketName,
        'marketResearchCost': this.marketResearchCost,
        'marketResearchPeriod': this.marketResearchPeriod,
        'marketStatus': this.marketStatus
      };
      // alert(index)
      console.log(putData)
      // PUT
      this.$axios.put('/game/compete/operation/market/manager'+'?marketBasicId='+index,putData,).then(response=>{
        // alert(index)
        console.log(response.data)
        // this.showIso();
        this.reload();
        // console.log(response.data.msg)

      }).catch(function(err){
        console.log(err);
      });
     },

    //关闭市场基本信息
    closeMarket(index) {
      this.$confirm('此操作将关闭市场基本信息，关闭后将不能再启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // alert(index)
      this.$axios({
        method:"put",
        url:'/game/compete/operation/market/manager/close'+'?marketBasicId='+index,
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
@import '../../assets/manager/market.less';
</style>
