<template>
  <div v-resize="onResize">
    <elMain :parentNode="appParams.pageData" v-resize="onResize" />
  </div>
</template>

<script>
import sysRoleApi from '@/api/sysRoleApi'
import { resizeObserver } from '@/utils/auth'
import elMain from '@/components/Page/elMain'
export default {
  provide(){
    return {
      superParams:this
    }
  },
  inject:['appParams'],
  components: {
    elMain
  },
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
    //this.getRoleList();
    //get parent dom
    if(!this.appParams.pageData){
      this.appParams['getPageNodeMethod'](this.$route.name);
    }
  },
  mounted() {
      var that = this;
      //界面挂载时设置固定高度
      that.$nextTick(function () {
          //that.tableHeight = resizeObserver("el-main",["roleManage","account-bottom"],85);
      })
  },
  methods: {
    //监听浏览器窗口变化
    onResize() {
        //this.tableHeight = resizeObserver("el-main",["roleManage","account-bottom"],85);
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
              message: this.$t('tip.success'),
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
                message: this.$t('tip.success'),
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
          message: this.$t('tip.success'),
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
