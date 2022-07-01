<template>
  <div>

    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary"  @click="addMenu">{{$t('form.add')}}</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      stripe
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      height="78vh"
    >

      <el-table-column
        prop="title"
        :label="$t('form.menuName')"
        sortable
        width="180"
      >
        <template slot-scope="scope">
          <span>{{$t(scope.row.title)}}</span>
        </template>
      </el-table-column>  

      <el-table-column
        prop="icon"
        :label="$t('form.menuIcon')" 
      />

      <el-table-column
        prop="type"
        :label="$t('form.menuType')" 
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">{{$t('form.directory')}}</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">{{$t('form.menu')}}</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">{{$t('form.button')}}</el-tag>
        </template>

      </el-table-column>

      <el-table-column
        prop="path"
        :label="$t('form.menuUrl')" 
      />
      <el-table-column
        prop="component" 
        :label="$t('form.menuComponent')" 
      />
      <el-table-column
        prop="orderNum" 
        :label="$t('form.sorting')" 
      />

      <el-table-column
        prop="icon"
        :label="$t('form.operation')" 
      >

        <template slot-scope="scope">
          <el-button type="text"   @click="editHandle(scope.row.id)">{{$t('form.edit')}}</el-button>

          
          <el-divider  direction="vertical" />
          <template >
            <el-popconfirm  :title="$t('tip.deleteCurrentMenu')" @confirm="delHandle(scope.row.id)">
              <el-button  slot="reference"  type="text">{{$t('form.delete')}}</el-button>
            </el-popconfirm>
          </template>

        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      :title="$t('tip.tip')"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >

      <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="150px" class="demo-editForm">

        <el-form-item :label="$t('form.higherMenu')" prop="parentId">
          <el-select v-model="editForm.parentId" clearable :placeholder="$t('tip.withoutSelectingMenu')" @change="testChange(editForm)">
            <template v-for="item in tableData">
              <el-option :key="item.id" :label="item.name" :value="item.id" />
              <template v-for="child in item.children">
                <el-option :key="child.id" :label="child.name" :value="child.id">
                  <span>{{ "- " + child.name }}</span>
                </el-option>
              </template>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('form.menuName')" prop="name">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>

        <el-form-item :label="$t('form.menuIcon')" prop="icon">
          <el-input v-model="editForm.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('form.menuUrl')" prop="path">
          <el-input v-model="editForm.path" autocomplete="off" />
        </el-form-item>

        <el-form-item :label="$t('form.menuComponent')" prop="component">
          <el-input v-model="editForm.component" autocomplete="off" />
        </el-form-item>

        <el-form-item :label="$t('form.menuType')" prop="type">
          <el-radio-group v-model="editForm.type">
            <el-radio :label="0">{{$t('form.directory')}}</el-radio>
            <el-radio :label="1">{{$t('form.menu')}}</el-radio>
            <el-radio :label="2">{{$t('form.button')}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('form.menuType')" prop="status">
          <el-radio-group v-model="editForm.status">
            <el-radio :label="0">{{$t('form.disable')}}</el-radio>
            <el-radio :label="1">{{$t('form.normal')}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('form.sorting')" prop="orderNum">
          <el-input-number v-model="editForm.orderNum" :min="1" :label="$t('form.sorting')">1</el-input-number>
        </el-form-item>

        <el-form-item class="submitMenu">
          <el-button type="primary" @click="submitForm('editForm')">{{$t('form.save')}}</el-button>
          <el-button @click="resetForm('editForm')">{{$t('form.resetMenu')}}</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>

</template>

<script>
import sysMenuApi from '@/api/sysMenuApi'
import { getSysMenu } from '@/api/commonApi'
import _ from 'lodash'
import { resetObj } from '@/utils/index'

export default {
  name: 'Menu',
  data() {
    const validateParentId = (rule, value, callback) => {
      if (!_.isNumber(value) && this.editForm.type !== 0) {
        var tip = this.$t('placeholder.pleaseSelect') + this.$t('form.higherMenu');
        callback(new Error(tip))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (!value) {
        var tip = this.$t('placeholder.pleaseEnter') + this.$t('form.menuName');
        callback(new Error(tip))
      } else {
        callback()
      }
    }

    const validateType = (rule, value, callback) => {
      if (!value) {
        var tip = this.$t('placeholder.pleaseSelect') + this.$t('form.menuType');
        callback(new Error(tip))
      } else {
        callback()
      }
    }
    
    const validateOrderNum = (rule, value, callback) => {
      if (!value) {
        var tip = this.$t('placeholder.pleaseWrite') + this.$t('form.sorting');
        callback(new Error(tip))
      } else {
        callback()
      }
    }
    const validateStatu = (rule, value, callback) => {
      if (!value) {
        var tip = this.$t('placeholder.pleaseSelect') + this.$t('form.statu');
        callback(new Error(tip))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      editForm: {},
      editFormRules: {
        parentId: [
          { validator: validateParentId, trigger: 'blur' }
        ],
        name: [
          { required: true, validator:validateName, trigger: 'blur' }
        ],
        type: [
          { required: true, validator:validateType, trigger: 'blur' }
        ],
        orderNum: [
          { required: true, validator:validateOrderNum, trigger: 'blur' }
        ],
        statu: [
          { required: true, validator:validateStatu, trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  created() {
    this.getMenuTree();
  },
  methods: {
    
    addMenu(){
      this.dialogVisible = true;
      this.editForm = resetObj(this.editForm);
    },
    getMenuTree() {
      sysMenuApi.getMockMenuList().then(res => {
        this.tableData = res.data.data;
      })
    },
    testChange(data) {
      //console.log('select data', data)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const submitForm = _.clone(this.editForm)
          if (this.checkCreateCatalogue()) {
            submitForm.parentId = 0
          }
          
         sysMenuApi.operateMockMenu(submitForm).then(res => {
            this.$message({
              showClose: true,
              message: this.$t('tip.success'),
              type: 'success',
              duration:500,
              onClose: () => {
                this.getMenuTree();
                getSysMenu(); //Obtain the route list again
                this.$store.commit('resetState'); //Clear existing menu selection status (existing selection status will not match the new menu list)
                //Select status for the current menu
                var routeList = this.$route.name.split(':');
                var currentRouteType = routeList[0] + ':' + routeList[1] + ':list'; //Parent menus that have submenus are named with the suffix :list
                var currentRouterList = this.$router.options.routes[0].children; //
                var tab = _.filter(currentRouterList,['name',currentRouteType]); //Get dynamically accessible child routes
                if(tab.length > 0){ //There are child routes
                  this.$store.commit('addTab', tab[0]); //The parent menu to which the submenu belongs is displayed
                }
              }
            })
            this.dialogVisible = false
         })
        } else {
          return false
        }
      })
    },
    checkCreateCatalogue() {
      if (this.editForm.id) {
        return false
      }
      if (!_.isNumber(this.editForm.parentId)) {
        return this.editForm.type === 0
      }
      return false
    },
    editHandle(id) {
      sysMenuApi.getMockMenuInfo({id:id}).then(res=>{
        this.editForm = res.data.data;
        this.dialogVisible = true;
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    delHandle(id) {
      sysMenuApi.deleteMenu(id).then(res => {
        this.$message({
          showClose: true,
          message: this.$t('tip.success'),
          type: 'success',
          duration:500,
          onClose: () => {
            this.getMenuTree();
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .submitMenu{
    padding-bottom: 30px;
  }
  ::v-deep{
    .el-table--border .el-table__cell, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
      border-right: 0px!important;
    }

    .el-select{
      width: 100%;
    }
  }
</style>
