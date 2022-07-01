<template>
  <div>

    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary"  @click="addMenu">新增</el-button>
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
        label="名称"
        sortable
        width="180"
      >
        <template slot-scope="scope">
          <span>{{$t(scope.row.title)}}</span>
        </template>
      </el-table-column>  

      <el-table-column
        prop="icon"
        label="图标"
      />

      <el-table-column
        prop="type"
        label="类型"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
        </template>

      </el-table-column>

      <el-table-column
        prop="path"
        label="菜单URL"
      />
      <el-table-column
        prop="component"
        label="菜单组件"
      />
      <el-table-column
        prop="orderNum"
        label="排序号"
      />
      <el-table-column
        prop="statu"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.statu === 1" size="small" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.statu === 0" size="small" type="danger">禁用</el-tag>
        </template>

      </el-table-column>
      <el-table-column
        prop="icon"
        label="操作"
      >

        <template slot-scope="scope">
          <el-button type="text"   @click="editHandle(scope.row.id)">编辑</el-button>

          
          <el-divider  direction="vertical" />
          <template >
            <el-popconfirm  title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
              <el-button  slot="reference"  type="text">删除</el-button>
            </el-popconfirm>
          </template>

        </template>
      </el-table-column>

    </el-table>

    <!--新增对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >

      <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="100px" class="demo-editForm">

        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="editForm.parentId" clearable placeholder="创建目录时可不选择菜单" @change="testChange(editForm)">
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

        <el-form-item label="菜单名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="图标" prop="icon" label-width="100px">
          <el-input v-model="editForm.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单URL" prop="path" label-width="100px">
          <el-input v-model="editForm.path" autocomplete="off" />
        </el-form-item>

        <el-form-item label="菜单组件" prop="component" label-width="100px">
          <el-input v-model="editForm.component" autocomplete="off" />
        </el-form-item>

        <el-form-item label="类型" prop="type" label-width="100px">
          <el-radio-group v-model="editForm.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态" prop="status" label-width="100px">
          <el-radio-group v-model="editForm.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序号" prop="orderNum" label-width="100px">
          <el-input-number v-model="editForm.orderNum" :min="1" label="排序号">1</el-input-number>
        </el-form-item>

        <el-form-item class="submitMenu">
          <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
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
        callback(new Error('请选择上级菜单'))
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
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '请填入排序号', trigger: 'blur' }
        ],
        statu: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  created() {
    this.getMenuTree();
  },
  methods: {
    //新增菜单
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
              message: '恭喜你，操作成功',
              type: 'success',
              duration:500,
              onClose: () => {
                this.getMenuTree();
                getSysMenu(); //重新属性路由列表
                this.$store.commit('resetState'); //清除已有的菜单选中状态(已有选中状态会与新菜单列表匹配错误)
                //针对当前菜单做选中状态
                var routeList = this.$route.name.split(':');
                var currentRouteType = routeList[0] + ':' + routeList[1] + ':list'; //有子菜单的父菜单命名后缀都为:list
                var currentRouterList = this.$router.options.routes[0].children; //取动态可访问的子路由
                var tab = _.filter(currentRouterList,['name',currentRouteType]); //匹配父菜单信息
                if(tab.length > 0){ //存在子路由
                  this.$store.commit('addTab', tab[0]); //设置子菜单归属的父菜单的选中回显
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
          message: '恭喜你，操作成功',
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
  }
</style>
