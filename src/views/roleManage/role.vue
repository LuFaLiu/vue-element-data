<template>
  <div v-resize="onResize">
    <!--
    <el-form :inline="true">
      <el-form-item>
        <el-input
          v-model="searchForm.name"
          placeholder="名称"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-button @click="getRoleList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
          <el-button slot="reference" type="danger" :disabled="delBtlStatu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
    -->


    <div class="roleManage">
      <div class="dataCout_title">角色管理</div>
      <div class="roleManage_right">
        <el-button type="primary" class="addAccountBtn" v-if="hasAuth('sys:role:save')" @click="addRole" icon="el-icon-plus">新增</el-button>
        <el-button slot="reference" icon="el-icon-delete" v-if="hasAuth('sys:role:delete')" type="danger" :disabled="delBtlStatu"  @click="delHandle(null)">删除</el-button>
      </div>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :height="tableHeight"
      stripe
      class="roleManage_table"
      @selection-change="handleSelectionChange"
    >

      <el-table-column
        type="selection"
        width="55"
        align="center"
      />

      <el-table-column
        type="index"
        label="序号"
        width="55"
        align="center"
        :index="indexMethod"
      />

      <el-table-column
        prop="name"
        label="角色"
        width="120"
      />
      <!--
      <el-table-column
        prop="code"
        label="唯一编码"
        show-overflow-tooltip
      />
      -->
      <el-table-column
        prop="remark"
        label="备注"
        show-overflow-tooltip
      />

      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status === 1">正常</div>
          <div v-else-if="scope.row.status === 0">禁用</div>
        </template>

      </el-table-column>
      <el-table-column
        prop="icon"
        label="操作"
      >

        <template slot-scope="scope">
          <div style="display:flex;align-items: center;">
            <div v-if="hasAuth('sys:role:perm')">
              <el-tooltip class="item" effect="dark" content="系统默认最高权限，不可以编辑和任意修改" placement="top" v-if="scope.row.code == 'superAdmin'">
                <span style="color:#C1C1C1;">权限</span>
              </el-tooltip>

              <el-button type="text" class="roleButton" @click="adminConfig(scope.row.id)" v-else>权限</el-button>
            </div>
      

            <!--
            <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
            -->
            <el-button type="text" class="viewButton" v-if="hasAuth('sys:role:queryRole')" @click="viewCurrentRole(scope.row.id)">查看</el-button>
            

            <template>
              <el-switch
                v-if="scope.row.code != 'superAdmin'"
                class="switchRole"
                v-model="scope.row.switchStatus"
                active-color="#1951FF"
                @change="disableRoleAccount(scope.row)"
                inactive-color="#CCCCCC">
              </el-switch>
              <!--
              <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
                <el-button slot="reference" type="text">删除</el-button>
              </el-popconfirm>
              -->
            </template>
          </div>

        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      class="account-bottom"
      layout="prev, pager, next"
      :page-sizes="[10, 20, 50, 100]"
      :current-page="current"
      :page-size="size"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!--新增对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >

      <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="100px" class="demo-editForm">

        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" autocomplete="off" />
        </el-form-item>

        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.remark" autocomplete="off" />
        </el-form-item>

        <el-form-item label="状态" prop="status" label-width="100px">
          <el-radio-group v-model="editForm.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>
</template>

<script>
import sysRoleApi from '@/api/sysRoleApi'
import { resizeObserver } from '@/utils/auth'

export default {
  name: 'Role',
  data() {
    return {
      searchForm: {},
      delBtlStatu: true,

      total: 0,
      size: 10,
      current: 1,

      dialogVisible: false,
      editForm: {

      },

      tableData: [],

      editFormRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入唯一编码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },

      multipleSelection: [],

      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableHeight:0,

    }
  },
  created() {
    this.getRoleList();
  },
  mounted() {
      var that = this;
      //界面挂载时设置固定高度
      that.$nextTick(function () {
          that.tableHeight = resizeObserver("el-main",["roleManage","account-bottom"],85);
      })
  },
  methods: {
    //监听浏览器窗口变化
    onResize() {
        this.tableHeight = resizeObserver("el-main",["roleManage","account-bottom"],85);
    },
    indexMethod(val){
      if(val < 10){
        val = '0' + (val+1);
      }else {
        val = (val+1)
      }
      return val;
    },
    addRole(){
      this.$router.push({path:'/sys/roleManage/addRole'});
    },
    viewCurrentRole(id){
      this.$router.push({path:'/sys/roleManage/addRole',query:{'id':id}});
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    //禁用/启用该角色的用户
    disableRoleAccount(row){
      var title = '';
      if(row.switchStatus){ //启用
        title = '启用';
      }else{ //禁用
        title = '禁用';
      }

      this.$confirm('确认要'+title+'该角色的用户', '确定'+title+'', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sysRoleApi.disableRole(row.id,row.switchStatus ? 1 : 0).then(res => {
          if(res.data.code == 200){
            this.$message({
              showClose: true,
              message: '恭喜你，操作成功',
              type: 'success',
              duration:500,
              onClose: () => {
                this.getRoleList();
              }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        });   
        this.getRoleList();    
      });


    },
    handleSelectionChange(val) {
      this.multipleSelection = val

      this.delBtlStatu = val.length === 0
    },

    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.size = val
      this.getRoleList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`)
      this.current = val
      this.getRoleList();
    },

    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },

    getRoleList() {
      sysRoleApi.getRoleList({
        name: this.searchForm.name,
        current: this.current,
        size: this.size
      }).then(res => {
        this.tableData = res.data.data.records.filter(v=>{
          this.$set(v,'switchStatus',v.status == 1 ? true : false);
          return v;
        })
        this.size = res.data.data.size
        this.current = res.data.data.current
        this.total = res.data.data.total
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sysRoleApi.saveOrUpdateRole((this.editForm.id ? 'updateRole' : 'saveRole'), this.editForm)
            .then(res => {
              this.$message.success({
                showClose: true,
                message: '恭喜你，操作成功',
                duration:500,
                onClose: () => {
                  this.getRoleList()
                }
              })

              this.dialogVisible = false
              this.resetForm(formName)
            })
        } else {
          return false
        }
      })
    },
    editHandle(id) {
      sysRoleApi.getRoleMenuInfo(id).then(res => {
        this.editForm = res.data.data
        this.dialogVisible = true
      })
    },
    delHandle(id) {
      var ids = []

      if (id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }

      sysRoleApi.deleteSelectRole(ids).then(res => {
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          duration:500,
          onClose: () => {
            this.getRoleList();
          }
        })
      })
    },

    adminConfig(id){
      this.$router.push({path:'/sys/roleManage/superAdministrator',query:{'id':id}})
    }
  }
}
</script>

<style lang="scss" scoped>

  .viewButton{
    margin-left: 30px;
  }


  .switchRole{
    margin-left: 40px;
  }

  .roleManage{
    padding: 17px 20px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .roleManage_right{
      ::v-deep{
        .el-button{
          color: #FFFFFF;
          border: none;
          border-radius: 5px;
        }
        .addAccountBtn{
          background: #20D4B1;
        }

        .el-pagination {
          float: right;
          margin-top: 22px;
        }
      }
    }
  }

  .roleManage_table{
    margin-top: 20px;
    border-radius: 8px;
  }
  
  ::v-deep{
    .el-pagination{
      position: absolute;
      left: 50%;
      bottom: 32px;
    }
  }



	

  

</style>
