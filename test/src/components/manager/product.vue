<template>
  <div class="main">
    <el-row class="row">
      <el-col :span="8" class="product" :key=index v-for="(item,index) in product">
        <!-- 展示产品基本信息 -->
        <div class="product-one">
        <!-- <div class="product-one" onmouseover="this.style.background='#CFDAE5'" onmouseout="this.style.background=''" v-on:click="toIndex(item.id)"> -->
          <!-- {{item.id}} -->
          <div class="left">
            <div>
              <el-tooltip content="关闭产品基本信息" placement="top">
                <el-button type="button" @click="closeProduct(item.id)" class="close" >X</el-button>
              </el-tooltip>
            </div>
            <p>
              <span>产品名称:</span>
              <span>{{item.productName}}</span>
            </p>
            <p>
              <span>研发周期:</span>
              <span>{{item.productResearchPeriod}}</span>
            </p>
            <p>
              <span>研发费用:</span>
              <span>{{item.productResearchCost}}</span>
            </p>
            <p>
              <span>生产周期:</span>
              <span>{{item.produceProductPeriod}}</span>
            </p>
            <p>
              <span>生产费用:</span>
              <span>{{item.produceProductCost}}</span>
            </p>
            <p>
              <span>产品售价:</span>
              <span>{{item.productSellingPrice}}</span>
            </p>

            <!-- 修改产品基本信息 -->
            <div>
              <!-- {{item.id}} -->
              <el-button class="modify" type="button" @click="clickModify(index,item.id)">修改</el-button>
              <el-dialog title="修改产品基本信息" :visible.sync="modify">
                <el-form>
                  <el-form-item :label="inputs[0].inputName" :label-width="formLabelWidth">
                    <el-input v-model="mount" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label="inputs[1].inputName" :label-width="formLabelWidth">
                    <el-input v-model="mountDifference" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label="inputs[2].inputName" :label-width="formLabelWidth">
                    <el-input v-model="mountFloat" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label="inputs[3].inputName" :label-width="formLabelWidth">
                    <el-input v-model="priceDifference" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label="inputs[4].inputName" :label-width="formLabelWidth">
                    <el-input v-model="priceFloat" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label="inputs[5].inputName" :label-width="formLabelWidth">
                    <el-input v-model="productName" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label="inputs[6].inputName" :label-width="formLabelWidth">
                    <el-input v-model="productResearchPeriod" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label="inputs[7].inputName" :label-width="formLabelWidth">
                    <el-input v-model="productResearchCost" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label="inputs[8].inputName" :label-width="formLabelWidth">
                    <el-input v-model="produceProductPeriod" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label="inputs[9].inputName" :label-width="formLabelWidth">
                    <el-input v-model="produceProductCost" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label="inputs[10].inputName" :label-width="formLabelWidth">
                    <el-input v-model="productSellingPrice" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-radio v-model="productDevelopStatus" label="TODEVELOP">未认证</el-radio>
                  <el-radio v-model="productDevelopStatus" label="DEVELOPED">认证完成</el-radio>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="modify = false">取 消</el-button>
                  <el-button type="submit" v-on:click="productModify(id)" >确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
          <div class="right">
            <h5>材料</h5>
            <!-- 显示原材料 -->
            <div :key="index" v-for="(material,index) in materialBasicInfo" v-if="item.id==material.productBasicInfo.id" class="showMaterial">
              <span>
                <b>{{material.materialBasicInfo.materialName}}:</b>{{material.number}}
              </span>
              <div>
                <el-button type="text" @click="clickModifyNumber(index,material.id)">修改数量</el-button>
                <el-dialog title="修改原材料数量" :visible.sync="modifyNumber">
                  <el-form>
                    <el-form-item label="原材料数量" :label-width="formLabelWidth" >
                      <el-input v-model="number" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="modifyNumber = false">取 消</el-button>
                    <el-button type="submit" @click="modifyMaterialNumber(productMaterialBasicId)" >确 定</el-button>
                  </div>
                </el-dialog>
                <el-button type="text" @click="deleteMaterial(material.id)">删除</el-button>
              </div>
            </div>
          </div>
          <!-- <el-divider>jjjj</el-divider> -->
        </div>
      </el-col>
      <el-col :span="8" class="product">
        <div class="product-add">
          <!-- 添加产品基本信息 -->
          <el-button type="button" @click="dialogFormVisible = true">添加产品基本信息</el-button>
          <el-dialog title="添加产品基本信息" :visible.sync="dialogFormVisible">
            <el-form v-model="inputs">
              <el-form-item :label="input.inputName" :label-width="formLabelWidth" :key="index" v-for="(input,index) in inputs">
                <el-input v-model="input.value" autocomplete="off"></el-input>
              </el-form-item>
              <el-radio v-model="status" label="TODEVELOP">未认证</el-radio>
              <el-radio v-model="status" label="DEVELOPED">认证完成</el-radio>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="submit" @click="addProduct" >确 定</el-button>
            </div>
          </el-dialog>
          <!-- 添加原料信息 -->
          <el-button @click="addM = true" class="addm">添加原材料</el-button>
          <el-dialog title="添加原料信息" :visible.sync="addM">
            <el-form v-model="materialInputs">
              <el-form-item :label="material.inputName" :label-width="formLabelWidth" :key="index" v-for="(material,index) in materialInputs">
                <el-input v-model="material.value" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addM = false">取 消</el-button>
              <el-button type="submit" @click="addMaterial()" >确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  data(){
    return{
      dialogFormVisible: false,
      addM:false,
      modify:false,
      modifyNumber:false,
      formLabelWidth: '120px',
      status: 'TODEVELOP',
      showStatus:"未认证",
      modifyStatus:"未认证",
      mount: null,
      mountDifference: null,
      mountFloat: null,
      priceDifference: null,
      priceFloat: null,
      productName:null,
      produceProductAmount:null,
      productResearchPeriod: null,
      productResearchCost: null,
      produceProductPeriod: null,
      produceProductCost: null,
      productSellingPrice: null,
      productDevelopStatus:null,
      materialBasicInfoId: null,
      number: null,
      productBasicInfoId: null,
      productMaterialBasicId:0,
      id:0,
      product:[],
      materialBasicInfo:[],
      material:[],
      inputs:[
        {inputName:"市场需求量",value:null},
        {inputName:"市场需求量差异",value:null},
        {inputName:"需求量波动比例",value:null},
        {inputName:"市场单价差异",value:null},
        {inputName:"价格波动比例",value:null},
        {inputName:"生产量",value:null},
        {inputName:"产品名称",value:null},
        {inputName:"研发周期",value:null},
        {inputName:"研发费用",value:null},
        {inputName:"生产周期",value:null},
        {inputName:"生产费用",value:null},
        {inputName:"产品售价",value:null}
      ],
      materialInputs:[
        {inputName:"产品名称",value:null},
        {inputName:"原料名称",value:null},
        {inputName:"原料数量",value:null}
      ]
    }
  },
  mounted:function(){
    this.showProduct();
    this.showProductMaterial();
    this.showMaterial();
    // alert("1")
  },
  methods:{
    // 材料
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
    //显示产品基本信息
    showProduct(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/product/manager/status'+'?enable='+true,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.product=response.data.data;
      }).catch(function(err){
        console.log(err);
      });
     },
    //显示产品材料构成
    showProductMaterial(){
       this.$axios({
        methods:"get",
        url:'/game/compete/operation/product/manager/material/status'+'?enable='+true,
        data:'',
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.materialBasicInfo=response.data.data;
        // console.log(this.materialBasicInfo)
      }).catch(function(err){
        console.log(err);
      });
    },

    //添加产品基本信息
    addProduct(){
      this.dialogFormVisible = false;
      let postData = JSON.stringify({
        mount: this.inputs[0].value,
        mountDifference: this.inputs[1].value,
        mountFloat: this.inputs[2].value,
        priceDifference: this.inputs[3].value,
        priceFloat: this.inputs[4].value,
        produceProductAmount:this.inputs[5].value,
        productName:this.inputs[6].value,
        productResearchPeriod: this.inputs[7].value,
        productResearchCost: this.inputs[8].value,
        produceProductPeriod: this.inputs[9].value,
        produceProductCost: this.inputs[10].value,
        productSellingPrice: this.inputs[11].value,
        productDevelopStatus: this.status
      });
      // console.log(postData)
      //POST
      this.$axios({
        method:"post",
        url:'/game/compete/operation/product/manager',
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

    // 添加材料
    addMaterial(){
      this.addM=false;
      // 产品
      for(var i=0;i<this.product.length;i++){
        if(this.materialInputs[0].value==this.product[i].productName){
          this.productBasicInfoId=this.product[i].id;
        }
      };
      // 原材料
      for(var j=0;j<this.material.length;j++){
        if(this.materialInputs[1].value==this.material[j].materialName){
          this.materialBasicInfoId=this.material[j].id;
          // console.log(this.material[1].materialName)
        }
        console.log(this.materialBasicInfoId)
      };
      let postData = JSON.stringify({
        productBasicInfoId: this.productBasicInfoId,
        materialBasicInfoId: this.materialBasicInfoId,
        number: this.materialInputs[2].value,
      });
      console.log(postData)
      this.$axios({
        method:"post",
        url:'/game/compete/operation/product/manager/material',
        data:postData,
        headers:{'Content-Type':'application/json'}
      }).then(response=>{
        this.productBasicInfoId=null;
        this.materialBasicInfoId=null;
        for(var i=0;i<this.materialInputs.length;i++){
          this.materialInputs[i].value=null;
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
      this.mount=this.product[index].mount;
      this.mountDifference=this.product[index].mountDifference;
      this.mountFloat=this.product[index].mountFloat;
      this.priceDifference=this.product[index].priceDifference;
      this.priceFloat=this.product[index].priceFloat;
      this.productName=this.product[index].productName;
      this.produceProductAmount=this.product[index].produceProductAmount;
      this.productResearchPeriod=this.product[index].productResearchPeriod;
      this.productResearchCost=this.product[index].productResearchCost;
      this.produceProductPeriod=this.product[index].produceProductPeriod;
      this.produceProductCost=this.product[index].produceProductCost;
      this.productSellingPrice=this.product[index].productSellingPrice;
      if(this.product[index].productDevelopStatus=="未认证")
        this.productDevelopStatus='TODEVELOP';
      else
        this.productDevelopStatus='DEVELOPED';
      this.id=id;
      // alert(this.id)
    },

    //修改产品基本信息
    productModify(index){
      this.modify=false;
      // alert(this.isoStatus)
      let putData = {
        'mount': this.mount,
        'mountDifference': this.mountDifference,
        'mountFloat': this.mountFloat,
        'priceDifference': this.priceDifference,
        'mountFloat': this.mountFloat,
        'productName':this.productName,
        'produceProductAmount':this.produceProductAmount,
        'productResearchPeriod': this.productResearchPeriod,
        'productResearchCost': this.productResearchCost,
        'produceProductPeriod': this.produceProductPeriod,
        'produceProductCost': this.produceProductCost,
        'productSellingPrice': this.productSellingPrice,
        'productDevelopStatus': this.productDevelopStatus
      };
      // alert(index)
      console.log(putData)
      // PUT
      this.$axios.put('/game/compete/operation/product/manager'+'?productBasicId='+index,putData,).then(response=>{
        // alert(index)
        console.log(response.data)
        // this.showIso();
        this.reload();
        // console.log(response.data.msg)

      }).catch(function(err){
        console.log(err);
      });
    },

    // 回填
    clickModifyNumber(index,id){
      this.modifyNumber=true;
      this.number=this.materialBasicInfo[index].number;
      this.productMaterialBasicId=id;
    },
    // 修改原材料数量
    modifyMaterialNumber(productMaterialBasicId){
      this.modifyNumber=false;
      let putData = {
        'productMaterialBasicId': this.productMaterialBasicId,
        'number': this.number
      };
       console.log(putData)
      // PUT
      this.$axios.put('/game/compete/operation/product/manager/material'+'?productMaterialBasicId='+productMaterialBasicId+'&number='+this.number,putData,).then(response=>{
        // alert(index)
        console.log(response.data)
        // this.showIso();
        this.reload();
        // console.log(response.data.msg)

      }).catch(function(err){
        console.log(err);
      });
    },

    //关闭产品基本信息
    closeProduct(index) {
      this.$confirm('此操作将关闭产品基本信息，关闭后将不能再启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // alert(index)
      this.$axios({
        method:"put",
        url:'/game/compete/operation/product/manager/close'+'?productBasicId='+index,
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
    },

    // 删除原材料
    deleteMaterial(index){
      this.$confirm('此操作将删除该原材料， 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // alert(index)
      this.$axios({
        method:"put",
        url:'/game/compete/operation/product/manager/material/close'+'?productMaterialBasicId='+index,
        data:''
      }).then(response=>{
        this.reload();
        console.log(response);
      }).catch(function(err){
        console.log(err);
      });
      this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
      this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/manager/product.less';
</style>
