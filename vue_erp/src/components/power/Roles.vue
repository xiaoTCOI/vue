<template>
  <div class="">
     <!-- 面包屑导航区  -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row :gutter="20">
        <!-- 添加角色 -->
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- <pre>
              {{scope.row}}
            </pre> -->
            <el-row :class="['bdbottom',i1 === 0 ? 'bdtop' : '','vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二、三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环嵌套渲染二级权限 -->
                <el-row :class="[i2 === 0 ? '' : 'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3,i3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row,item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeRoleById(scope.row.id)">删除</el-button>
            </el-tooltip>

            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>

      <!-- 添加角色对话框 -->
      <el-dialog title="添加角色" :visible.sync="addDialogVisible"
      width="50%" @close="addDialogClosed">
        <!-- 内容主体区 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改角色对话框 -->
      <el-dialog title="修改角色" :visible.sync="editDialogVisible"
      width="50%" @close="editDialogClosed">
        <!-- 内容主体区 -->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
          <el-form-item label="角色名称" >
            <el-input v-model="editForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="editForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRoleInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible"
    width="50%" @close="setRightDialogClosed">
      <!-- 树形控件 -->
      <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id"
      default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {
      // 所有角色的列表数据
      rolelist:[],
      // 控制添加角色对话框的显示与隐藏
      addDialogVisible:false,
      // 添加角色的表单数据
      addForm:{
        roleName:'',
        roleDesc:''
      },
      // 控制修改角色对话框的显示与隐藏
      editDialogVisible:false,
      // 查询到的角色信息对象
      editForm:{},
      // 添加表单的验证规则对象
      addFormRules:{
        roleName:[
          {
            required:true,
            message:'请输入角色名',
            trigger:'blur'
          },
          {
            min:3,
            max:10,
            message:'角色名的长度在3~10个字符之间',
            trigger:'blur'
          }
        ],
        roleDesc:[
          {
            required:true,
            message:'请输入角色描述',
            trigger:'blur'
          }
        ]
      },
      // 修改表单验证规则对象
      editFormRules:{
        roleName:[
          {
            required:true,
            message:'请输入角色名',
            trigger:'blur'
          },
          {
            min:3,
            max:10,
            message:'角色名的长度在3~10个字符之间',
            trigger:'blur'
          }
        ],
        roleDesc:[
          {
            required:true,
            message:'请输入角色描述',
            trigger:'blur'
          }
        ]
      },
      // 控制权限分配对话框的显示与隐藏
      setRightDialogVisible:false,
      // 所有权限的数据
      rightslist:[],
      // 树形控件的属性绑定对象
      treeProps:{
        label:'authName',
        children:'children'
      },
      // 默认选中的节点Id值数组
      defKeys:[],
      // 当前即将分配权限的角色id
      roleId:''
    }
  },
  created(){
    this.getRolesList()
  },
  methods: {
    // 获取所有角色的列表
    getRolesList(){
      this.$axios.get('roles').then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error('获取角色列表失败！');
        }
        this.rolelist = res.data.data;
      }).catch(err=>err)
    },
    // 监听添加角色对话框的关闭事件
    addDialogClosed(){
      // 重置表单
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮添加新角色
    addRole(){
      this.$refs.addFormRef.validate(valid=>{
        if(!valid) return;
        // 可以发起添加角色的网络请求
        this.$axios.post('roles',this.addForm).then(res=>{
          console.log(res.data)
          if(res.data.meta.status!=201) return this.$message.error(res.data.meta.msg)
          this.$message.success(res.data.meta.msg);
          // 隐藏添加角色的对话框
          this.addDialogVisible = false;
          // 重新获取角色列表数据
          this.getRolesList();
        }).catch(err=>{
          console.log(err);
        })
      });
    },
    // 展示编辑角色的对话框
    showEditDialog(id){
      // console.log(id)
      this.$axios.get('roles/' + id).then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error(res.data.meta.msg);
        }
        this.editForm = res.data.data;
        this.editDialogVisible=true;
      }).catch(err=>{
        console.log(err);
      })
    },
    // 监听修改角色对话框的关闭事件
    editDialogClosed(){
      this.$refs.editFormRef.resetFields();
    },
    // 修改角色信息并提交
    editRoleInfo(){
      this.$refs.editFormRef.validate(valid=>{
        if(!valid) return;
        // 发起角色信息请求
        this.$axios.put('roles/'+this.editForm.roleId,{
          roleName:this.editForm.roleName,
          roleDesc:this.editForm.roleDesc
        }).then(res=>{
          if(res.data.meta.status !== 200){
            return this.$message.error(res.data.meta.msg);
          }
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
          this.getRolesList();
          // 提示修改成功
          this.$message.success(res.data.meta.msg)
        })
      })
    },
    // 根据id删除对应的角色信息
    async removeRoleById(id){
       // 弹框询问用户是否删除数据
       const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err=>err)
      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消了删除，则返回值为字符串cancel
      if(confirmResult != 'confirm'){
        return this.$message.info('已取消删除');
      }
      this.$axios.delete('roles/'+id).then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error('删除用户失败');
        }
        this.$message.success(res.data.meta.msg);
        this.getRolesList();
      }).catch(err=>err)
    },
    // 根据id删除对应的权限
    async removeRightById(role,rightId){
      // 弹框提示用户是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err=>err)
      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消了删除，则返回值为字符串cancel
      if(confirmResult != 'confirm'){
        return this.$message.info('已取消删除');
      }
      this.$axios.delete(`roles/${role.id}/rights/${rightId}`).then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error('删除权限失败！');
        }
        this.$message.success('删除权限成功');
        role.children = res.data.data
      }).catch(err=>err)
    },
    // 展示分配权限的对话框
    showSetRightDialog(role){
      this.roleId = role.id;
      // 获取所有权限的数据
      this.$axios.get('rights/tree').then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error('获取权限数据失败！');
        }
        // 把获取到的权限数据保存到data中
        this.rightslist = res.data.data;
        // 递归获取三级节点Id
        this.getLeafKeys(role,this.defKeys)
        this.setRightDialogVisible = true;
      }).catch(err=>err)
    },
    // 通过递归的形式，获取角色下所有三级权限的id，并保存到defKeys数组中
    getLeafKeys(node,arr){
      if(!node.children){
        // 如果当前node节点不包含children属性，则是三级节点
        return arr.push(node.id);
      }
      node.children.forEach(item=>this.getLeafKeys(item,arr))
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed(){
      this.defKeys = [];
    },
    // 点击为角色分配权限
    allotRights(){
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',');
      this.$axios.post(`roles/${this.roleId}/rights`,
      {rids:idStr}).then(res=>{
        if(res.data.meta.status !== 200){
          return this.$message.error('分配权限失败！');
        }
        this.$message.success('分配权限成功！');
        this.getRolesList();
        this.setRightDialogVisible = false;
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../../assets/less/Roles.less";
</style>
