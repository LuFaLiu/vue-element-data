<template>
  <elComponent v-if="appParams.pageData" :node="appParams.pageData" :route="$route.name" v-cloak/>
</template>

<script>
import sysRoleApi from '@/api/sysRoleApi'
import _ from 'lodash'
import {apiRequestTable} from "@/api/commonApi";
import elComponent from '@/components/elComponent/index'

export default {
  provide(){
    return {
      superParams:this
    }
  },
  inject:['appParams'],
  components: {
    elComponent
  },
  data() {
    return {
      delBtlStatu: true,
      pageAttribute:{
        total: 0,
        size: 10,
        current: 1,
      },
      

      dialogVisible: false,
      editForm: {
        
      },
      tableData: [],

      radioList:[
        {
          lable:0,
          name:'form.disable'
        },
        {
          lable:1,
          name:'form.normal'
        }
      ],
      editFormRules: {
        nickName: [
          { required: true, message: this.$t('placeholder.pleaseEnter') + this.$t('form.nickName'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('placeholder.pleaseEnter') + this.$t('form.email'), trigger: 'blur' }
        ],
        status: [
          { required: true, message: this.$t('placeholder.pleaseEnter') + this.$t('form.statu'), trigger: 'blur' }
        ]
      },

      multipleSelection: [],

      roleDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleForm: {},
      roleTreeData: [],
      treeCheckedKeys: [],
      checkStrictly: true,
      editFormStatus:0,
      exportLoading:false,
      tableHeight:0,
      node:''
    }
  },
  created() {
    this.getDataList();
  },
  methods: {
    indexMethod(index){
      if(index < 9){
        return '0' + (index+1); 
      }else {
        return index+1;
      }
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

    addRole(){
      if(this.appParams.selectPageMethod){ //app.vue
        this.appParams.selectPageMethod('sys:roleManage:addRole',true);
      }else{ //addPage.vue
        this.$router.push({path:'/roleManage/addRole'})
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delBtlStatu = val.length === 0;
    },

    handleSizeChange(val) {
      this.pageAttribute.size = val
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.pageAttribute.current = val
      this.getDataList()
    },

    paginationJumpMethod(val){
      this.getDataList();
    },

    getDataList() {
      var that = this;
      apiRequestTable(that,sysRoleApi,'getRoleList',that.pageAttribute,function (res) {

        that.tableData = res.items;
        that.pageAttribute.current = parseInt(res.current);
        that.pageAttribute.size = res.size;
        that.pageAttribute.total = res.total;
      },{},that.pageAttribute.current,that.pageAttribute.size);
      
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sysRoleApi.saveOrUpdateUser((this.editForm.id ? 'updateUser' : 'saveUser'), this.editForm)
            .then(res => {
              this.$message({
                showClose: true,
                message: this.$t('tip.success'),
                type: 'success',
                duration:500,
                onClose: () => {
                  this.getDataList()
                }
              })

              this.dialogVisible = false
            })
        } else {
          return false
        }
      })
    },
    editHandle(id) {
      this.editFormStatus = 0;
      this.$router.push({path:'/sys/roleInfo/roleDetail',query:{'id':id}})
    },
    delHandle(roleId) {

      var roleIds = []

      if (roleId) {
        roleIds.push(roleId)
      } else {
        this.multipleSelection.forEach(row => {
          roleIds.push(row.id)
        })
      }

      if(roleIds.length == 0){
        this.$message({
          showClose: true,
          message: this.$t('placeholder.pleaseSelect') + this.$t('form.role'),
          type: 'warning',
          duration:1000
        })
        return false;
      }

      this.$confirm(this.$t('tip.confirmDelete')+this.$t('tip.pieceData'), this.$t('tip.confirmDelete'), {
        confirmButtonText: this.$t('form.sure'),
        cancelButtonText: this.$t('form.cancel')
        //type: 'warning'
      }).then(() => {
        sysRoleApi.deleteUser(roleIds).then(res => {
          this.$message({
            showClose: true,
            message: this.$t('tip.success'),
            type: 'success',
            duration:500,
            onClose: () => {
              this.getDataList()
            }
          })
        })

      })
    },
    repassHandle(roleId, nickName) {
      this.$confirm(this.$t('tip.resetPassword'), this.$t('tip.submitReset'), {
        confirmButtonText: this.$t('form.sure'),
        cancelButtonText: this.$t('form.cancel')
        //type: 'warning'
      }).then(() => {
        sysRoleApi.rePassword({'roleId':roleId}).then(res => {
          this.$message({
            showClose: true,
            message: this.$t('tip.success'),
            type: 'success',
            duration:500,
            onClose: () => {
              this.getDataList();
            }
          })
        })
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .accountList {
    .el-row{
      margin: 0!important;
      padding: 20px;
      width: auto;
      background: #FFFFFF;
      border-radius: 8px;
    }

    .searchForm{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .search-left{
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        ::v-deep{
          .el-form-item__content{
            display: flex;
          }
        }
      }

      ::v-deep{
        .el-form-item{
          /*margin-bottom: 0px;*/
          margin-right: 20px;
          .el-form-item__content{
            .el-input{
              width: 145px;
            }
          }
        }
      }
      
      .el-button{
        color: #FFFFFF;
        border: none;
        border-radius: 5px;
      }
      .addAccountBtn{
        background: #20D4B1;
      }
      .searchAccount{
        width: 150px;
      }
    }


    .account-bottom{
      margin-top: 25px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      .export_data{
        width: 115px;
        color: #FFFFFF;
        border: none;
        margin-bottom: 15px;
      }
      .el-pagination {
        margin-left: 20%;
        margin-bottom: 15px;
      }
    }
    
    

    .accountTable{
      margin-top: 20px;
      border-radius: 8px;
    }
  }

</style>

