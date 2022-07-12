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
          { required: true, message:this.$t('placeholder.pleaseEnter') + this.$t('routerMenu.roleName'), trigger: 'blur' }
        ],
        code: [
          { required: true, message:this.$t('placeholder.pleaseEnter') + this.$t('form.onlyCoding'), trigger: 'blur' }
        ],
        status: [
          { required: true, message:this.$t('placeholder.pleaseSelect') + this.$t('form.statu'), trigger: 'blur' }
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
      that.$nextTick(function () {
          //that.tableHeight = resizeObserver("el-main",["roleManage","account-bottom"],85);
      })
  },
  methods: {
    //Listen for browser window changes
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
    //To disable or enable users of this role
    disableRoleAccount(row){
      var title = '';
      if(row.switchStatus){ 
        title = this.$t('form.enable');
      }else{ 
        title = this.$t('form.disable');
      }

      this.$confirm( row.switchStatus ? this.$t('tip.enableRole') : this.$t('tip.disableRole'),row.switchStatus ?  (this.$('form.sure') + this.$t('form.enable')) : (this.$('form.sure') + this.$t('form.disable')), {
        confirmButtonText: this.$t('form.sure'),
        cancelButtonText: this.$t('form.cancel'),
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
          message: this.$t('tip.beenCancelled')
        });   
        this.getRoleList();    
      });


    },
    handleSelectionChange(val) {
      this.multipleSelection = val

      this.delBtlStatu = val.length === 0
    },

    handleSizeChange(val) {
      this.size = val
      this.getRoleList();
    },
    handleCurrentChange(val) {
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
