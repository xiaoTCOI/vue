<template>
  <div>
    <!-- 面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <!-- 搜索与添加区域 -->
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户 -->
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190px">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            </el-tooltip>

            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible"
    width="50%" @close="addDialogClosed">
      <!-- 内容主体区 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible"
    width="50%" @close="editDialogClosed">
      <!-- 内容主体区 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" >
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配用户" :visible.sync="setRoleDialogVisible"
    width="50%" @close="setRoleDialogClosed">
      <!-- 内容主体区 -->
      <div>
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data(){
    // 验证邮箱的规则
    var checkEmail=(rule,value,cb)=>{
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      // 合法的邮箱
      if(regEmail.test(value))
        return cb();
      cb(new Error('请输入合法的邮箱'));
    }
    // 验证手机号的规则
    var checkMobile=(rule,value,cb)=>{
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      // 合法的手机号
      if(regMobile.test(value))
        return cb();
      cb(new Error('请输入合法的手机号'));
    }
    return {
      // 获取用户列表的参数对象
      queryInfo:{
        query:'',
        // 当前的页数
        pagenum:1,
        // 当前每页显示多少条数据
        pagesize:2
      },
      userlist:[],
      total:0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible:false,
      // 添加用户的表单数据
      addForm:{
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      // 添加表单的验证规则对象
      addFormRules:{
        username:[
          {
            required:true,
            message:'请输入用户名',
            trigger:'blur'
          },
          {
            min:3,
            max:10,
            message:'用户名的长度在3~10个字符之间',
            trigger:'blur'
          }
        ],
        password:[
          {
            required:true,
            message:'请输入密码',
            trigger:'blur'
          },
          {
            min:6,
            max:15,
            message:'密码的长度在6~15个字符之间',
            trigger:'blur'
          }
        ],
        email:[
        {
            required:true,
            message:'请输入邮箱',
            trigger:'blur'
          },
          {
            validator:checkEmail,
            trigger:'blur'
          }
        ],
        mobile:[
          {
            required:true,
            message:'请输入手机号码',
            trigger:'blur'
          },
          {
            validator:checkMobile,
            trigger:'blur'
          }
        ]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible:false,
      // 查询到的用户信息对象
      editForm:{},
      // 修改表单验证规则对象
      editFormRules:{
        email:[
        {
            required:true,
            message:'请输入邮箱',
            trigger:'blur'
          },
          {
            validator:checkEmail,
            trigger:'blur'
          }
        ],
        mobile:[
          {
            required:true,
            message:'请输入手机号码',
            trigger:'blur'
          },
          {
            validator:checkMobile,
            trigger:'blur'
          }
        ]
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible:false,
      // 需要被分配角色的用户信息
      userInfo:{},
      // 所有角色的数据列表
      rolesList:[],
      // 已选中的角色id值
      selectedRoleId:''

    }
  },
  created(){
    this.getUserList()
  },
  methods: {
    getUserList(){
      this.$axios({
        methods:'get',
        url:'users',
        params:this.queryInfo
      }).then(res=>{
        // console.log(res.data)
        if(res.data.meta.status !== 200)
          return this.$message.error(res.data.meta.msg);
        this.userlist = res.data.data.users;
        this.total = res.data.data.total;

      }).catch(function(err){
        console.log(err);
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize){
      this.queryInfo.pagesize=newSize;
      this.getUserList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum=newPage;
      this.getUserList();
    },
    // 监听switch开关状态的改变
    userStateChanged(userinfo){
      var putData={
        'id':userinfo.id,
        'mg_state':userinfo.mg_state
      }
      this.$axios.put(`users/${userinfo.id}/state/${userinfo.mg_state}`,putData).then(res=>{
        // console.log(url)
        if(res.data.meta.status !== 200){
          userinfo.mg_state = !userinfo.mg_state;
          return this.$message.error(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg);
      }).catch(function(err){
        console.log(err);
      })
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed(){
      // 重置表单
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮添加新用户
    addUser(){
      // let userData = JSON.stringify(this.addForm);
      // console.log(userData)
      this.$refs.addFormRef.validate(valid=>{
        if(!valid) return;
        // 可以发起添加用户的网络请求
        this.$axios.post('users',this.addForm).then(res=>{
          // console.log(res.data)
          if(res.data.meta.status!=201) return this.$message.error(res.data.meta.msg)
          this.$message.success(res.data.meta.msg);
          // 隐藏添加用户的对话框
          this.addDialogVisible = false;
          // 重新获取用户列表数据
          this.getUserList();
        }).catch(err=>{
          console.log(err);
        })
      });
    },
    // 展示编辑用户的对话框
    showEditDialog(id){
      // console.log(id)
      this.$axios.get('users/' + id).then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error(res.data.meta.msg);
        }
        this.editForm = res.data.data;
        this.editDialogVisible=true;
      }).catch(err=>{
        console.log(err);
      })
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed(){
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo(){
      this.$refs.editFormRef.validate(valid=>{
        if(!valid) return;
        // 发起用户信息请求
        this.$axios.put('users/'+this.editForm.id,{
          email:this.editForm.email,
          mobile:this.editForm.mobile
        }).then(res=>{
          if(res.data.meta.status !== 200){
            return this.$message.error(res.data.meta.msg);
          }
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
          this.getUserList();
          // 提示修改成功
          this.$message.success(res.data.meta.msg)
        }).catch(err=>err)
      })
    },
    // 根据id删除对应的用户信息
    async removeUserById(id){
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err=>err)
      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消了删除，则返回值为字符串cancel
      if(confirmResult != 'confirm'){
        return this.$message.info('已取消删除');
      }
      this.$axios.delete('users/'+id).then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error('删除用户失败');
        }
        this.$message.success(res.data.meta.msg);
        this.getUserList();
      }).catch(err=>err)
    },
    // 展示分配角色对话框
    setRole(userInfo){
      this.userInfo = userInfo;
      // 在展示对话框之前，获取所有角色的列表
      this.$axios.get('roles').then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error('获取角色列表失败！');
        }
        this.rolesList = res.data.data;
        this.setRoleDialogVisible = true;
      }).catch(err=>err)
    },
    // 点击按钮，分配角色
    saveRoleInfo(){
      if(!this.selectedRoleId){
        return this.$message.error('请选择要分配的角色！');
      }
      this.$axios.put(`users/${this.userInfo.id}/role`,{
        rid:this.selectedRoleId}).then(res=>{
        console.log(res.data)
        if(res.data.meta.status !== 200){
          return this.$message.error('更新角色失败！');
        }
        this.$message.success('更新角色成功！');
        this.getUserList();
        this.setRoleDialogVisible = false;
      }).catch(err=>err)
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed(){
      this.selectedRoleId = '';
      this.userInfo = {};
    }
  }
}
</script>
<style lang="less" scoped>
</style>
