<template>
    <el-row class="addRole" v-resize="onResize">
        <el-col class="roleCondition" :span="24">
            <div class="dataCout_title" v-if="viewType == 0">新增角色</div>
            <div class="dataCout_title" v-else>{{roleType}}</div>
            <el-form ref="editForm" :model="editForm" :rules="editFormRules" class="demo-editForm">

                <div class="editForm_left">
                    <el-form-item label="昵称" prop="name" label-width="53px">
                        <el-input v-model="editForm.name" placeholder="请输入昵称" autocomplete="off" :disabled="viewType == 1 ? true : false" />
                    </el-form-item>

                    <el-form-item label="状态" prop="status" label-width="70px">
                        <el-select v-model="editForm.status" placeholder="请选择" :disabled="viewType == 1 ? true : false">
                            <el-option
                            v-for="item in roleStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    

                    <el-form-item label="角色描述" label-width="145px">
                        <el-input v-model="editForm.remark" placeholder="请输入描述内容" autocomplete="off" :disabled="viewType == 1 ? true : false" />
                    </el-form-item>

                    
                    <div class="adminConfig_tip" v-if="viewType == 0">提示：请给角色配置权限哦</div>
                </div>
                <div class="editForm_right" v-if="viewType == 0">
                    <el-form-item>
                        <el-button @click="resetForm('editForm')">取消</el-button>
                        <el-button type="primary" @click="submitForm('editForm')">保存</el-button>
                    </el-form-item>
                </div>
            </el-form>

        </el-col>

        
        <el-col>
           
            <el-table
                :data="permTreeData"
                border
                style="width: 100%"
                class="config_table"
                :height="tableHeight">
                    
                    <el-table-column
                    prop="name"
                    label="一级菜单"
                    width="180"
                    align="center">
                        <template slot-scope="scope">
                            <el-checkbox  v-model="scope.row.checked" @change="checkMenu(scope.row)" :disabled="viewType == 1 ? true : false">{{scope.row.name}}</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="二级菜单"
                    width="300">
                        <template slot-scope="scope">
                            <el-checkbox v-for="(item,index) in  searchCurrentMenu(scope.row.id)" :key="index" v-model="item.checked" @change="checkMenu(item)" :disabled="viewType == 1 ? true : false">{{item.name}}</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="三级菜单">
                        <template slot-scope="scope">
                            <el-checkbox v-for="(item,index) in searchCurrentMenu(scope.row.id,scope.row.children)" :key="index" v-model="item.checked" @change="checkMenu(item)" :disabled="viewType == 1 ? true : false">{{item.name}}</el-checkbox>
                        </template>
                    </el-table-column>
            </el-table>


        </el-col>
    </el-row>
</template>
<script>
import sysRoleApi from '@/api/sysRoleApi'
import sysMenuApi from '@/api/sysMenuApi'
import { convertPinyin } from '@/utils/convertPinYin'
import { resizeObserver } from '@/utils/auth'
export default {
    data(){
        return {
            checked:false,
            editForm: {
                name:'',
                code:'',
                remark:'',
                status:1,
                menuIds:[]
            },
            roleStatus:[               
                {value:1,label:'启用'},
                {value:0,label:'禁用'}
            ],
            editFormRules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'change' }
                ]
            },
            permTreeData:[],
            deepPermTreeData:[],
            viewType:0,
            roleType:'',
            tableHeight:0
        }
    },
    created(){
        if(this.$route.query.id){
            this.viewType = 1;
        }else {
            this.viewType = 0;
        }
        this.getRoleManageList();
    },
    mounted() {
        var that = this;
        //界面挂载时设置固定高度
        that.$nextTick(function () {
        that.tableHeight = resizeObserver("el-main",["roleCondition"],110);
        })
    },
    methods:{
        //监听浏览器窗口变化
        onResize() {
            this.tableHeight = resizeObserver("el-main",["roleCondition"],110);
        },
        getRoleMenuInfo(id){
            sysRoleApi.getRoleMenuInfo(id).then(res => {
                if(res.status == 200)
                this.editForm = res.data.data;
                this.roleType = res.data.data.name;
                this.deepPermTreeData.filter(v=>{
                    if(_.includes(res.data.data.menuIds, v.id)){ //用值去匹配集合里面的值
                        this.$set(v,'checked',true);
                    }else {
                        this.$set(v,'checked',false);
                    }
                    return v;
                });
            })
        },
        searchCurrentMenu(id,list){ //目前菜单只有两个三层
            //children,type,parentId 下级永远拥有一个父级（parentId）指向父级
            var menuList = [];
            if(list){
                list.filter(v=>{
                    this.deepPermTreeData.filter(p=>{
                        if(v.id == p.parentId){
                            menuList.push(p);
                        }
                    })
                })
            }else {
                this.deepPermTreeData.filter(v=>{
                    if(v.parentId == id){
                        menuList.push(v);
                    }
                })
            }
            return menuList;
        },
        getRoleManageList(){
            sysMenuApi.getMenuList().then(res => {
                this.permTreeData = res.data.data;
                this.deepPermTreeData = [];
                this.deepMenuList(res.data.data);
                if(this.viewType == 1){
                    this.getRoleMenuInfo(this.$route.query.id);
                }
            })
        },
        deepMenuList(data){
            data.filter(v=>{
                this.$set(v,'checked',false);
                this.deepPermTreeData.push(v);
                if(v.children){ //不能添加v.children.length > 0否则会跳过后面的执行
                    this.deepMenuList(v.children);
                }
            })
        },
        checkMenu(row){
            this.editForm.menuIds = [];
            this.searchParent(row);
            this.deepPermTreeData.filter(v=>{
                if(v.checked){
                    this.editForm.menuIds.push(v.id);
                }
            })
        },
        resetForm(formName) {
            if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields()
            }
            this.dialogVisible = false
            this.editForm.name = '',
            this.editForm.remark = '',
            this.editForm.status = '',
            this.editForm.menuIds = [];
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editForm.code = '';
                    this.editForm.code = convertPinyin(this.editForm.name);

                    sysRoleApi.saveOrUpdateRole('saveRole',this.editForm)
                        .then(res => {
                            if(res.status == 200){
                                this.$message.success({
                                    showClose: true,
                                    message: '恭喜你，操作成功',
                                    duration:500,
                                    onClose: () => {
                                        this.$router.go(-1);
                                    }
                                })
                                this.dialogVisible = false
                                this.resetForm(formName);
                            }
                        })
                } else {
                    return false
                }
            })
        },

        //查找父级id
        searchParent(row){
            //this.$set(v,'checked',false);
            this.deepPermTreeData.filter(v=>{

                    if(row.parentId == 0){ //当前级别为最高级别
                        if(row.id == v.parentId){ //当前最高级别的子级
                            if(row.checked){ //当前元素为勾选状态
                                this.$set(v,'checked',true); //对当前元素的子级进行勾选
                                this.checkList = [];
                                this.deepCheckedChildList(row.children);
                                this.checkedRoleList(this.checkList);
                            }else { //当前元素为取消勾选状态
                                this.$set(v,'checked',false); //对当前元素的子级取消勾选
                                this.checkList = [];
                                this.deepCheckedChildList(row.children);
                                this.unCheckedRoleList(this.checkList);
                            }
                        }
                    }else {
                        if(v.id == row.parentId){ //当前级别不是最高级别/当前元素父级
                            if(row.checked){ //当前元素已勾选
                                this.$set(v,'checked',true); //勾选父级
                                var idList = [];
                                idList.push(v.parentId);
                                this.checkedRoleList(idList);
                                this.checkList = [];
                                this.deepCheckedChildList(row.children);
                                this.checkedRoleList(this.checkList);
                            }else{ //当前元素取消勾选
                                this.deepunCheckedRoleList(v,row.id);
                                this.checkList = [];
                                this.deepCheckedChildList(row.children);
                                this.unCheckedRoleList(this.checkList);
                            }
                        }
                
                    }

            })
            
            
        },
        //勾选对应的权限
        checkedRoleList(idList){
            this.deepPermTreeData.filter(v=>{
                if(idList.indexOf(v.id) > -1){
                    this.$set(v,'checked',true); 
                }
            })
        },
        //取消勾选对应的权限
        unCheckedRoleList(idList){
            this.deepPermTreeData.filter(v=>{
                if(idList.indexOf(v.id) > -1){
                    this.$set(v,'checked',false); 
                }
            })
        },
        //递归遍历
        deepunCheckedRoleList(list,id){
            var isChecked = [];
            var unChecked = [];
            isChecked = _.filter(list.children,['checked',false]); //同级节点未勾选列表
            unChecked = _.filter(list.children,['checked',true]); //同级已勾选的节点
            if(isChecked.length == list.children.length){ //同级元素都取消勾选
                var listId = [];
                listId.push(list.id);
                this.unCheckedRoleList(listId); //取消勾选父级
                if(list.parentId != 0){
                    var parentObj = this.searchRoleList(list.parentId); //找出父级的同级
                    this.deepunCheckedRoleList(parentObj,parentObj.id);
                }
            }else {
                var list = [];
                list.push(id);
                //this.unCheckedRoleList(list);
            }
        },
        //找到对应父节点列表
        searchRoleList(id){
            var list = {};
            this.deepPermTreeData.filter(v=>{
                if(id == v.id){
                    list = v;
                }
            })
            return list;
        },
        //勾选子列表
        deepCheckedChildList(row){
            row.filter(v=>{
                this.checkList.push(v.id);
                if(v.children){
                    this.deepCheckedChildList(v.children);
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .addRole{
        position: fixed;
        width: calc(100% - 240px);
        height: calc(100% - 114px);
        padding: 20px;
        border-radius: 8px;
        background: #FFFFFF;
        .adminConfig_tip{
            margin-top: 20px;
            width: fit-content;
            padding: 7px 14px 9px 14px;
            background: #FF7777;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
        }
        .demo-editForm{
            margin-top: 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .editForm_left{
                width: 80%;
                display: flex;
                align-items: center;
               .adminConfig_tip{
                   margin-top: 0;
                   margin-left: 40px;
               }
            }
            .editForm_right{
               float: right;
            }
            ::v-deep{
                .el-select{
                    width: 100px;
                }
                .el-form-item{
                    margin-bottom: 0;
                }
                .el-button{
                    padding: 10px 32px;
                    margin-left: 20px;
                    border-radius: 5px 5px 5px 5px;
                    font-size: 16px;
                    line-height: 15px;
                }

                .el-button--default{
                    border: 1px solid #336FF6;
                    color: #336FF6;
                }

                .el-button--default:hover{
                 background-color: transparent;
                }

                .el-button--primary{
                    background: #336FF6;
                    border: 1px solid #336FF6;
                }
            }

        }

        .config_table{

            margin-top: 27px;

            
        }
    }

    ::v-deep {
        .el-tree-node /*,.el-tree-node.is-expanded>.el-tree-node__children*/{
            display: flex;
        }
        .el-tree-node.is-expanded>.el-tree-node__children{
            padding: 30px;
            border: 1px solid #CCCCCC;
        }
        .el-tree-node__content>.el-tree-node__expand-icon{
            display: none;
        }
        .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
            border-bottom: 1px solid #CCCCCC!important;
        }

        .el-checkbox__inner{
            border: 1px solid #CCCCCC;
        }

        .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-radius: 3px;
            background-color: #336FF6;
            border-color: #336FF6;
        }

        .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__label{
            color: #333333;
            font-size: 15px;
        }
        .has-gutter{
            tr{
                th{
                    text-align: center;
                    background: #D3ECFF;
                    padding: 12px 0!important;
                }
            }
        }

        .el-table--border .el-table__cell, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
            border-right: 1px solid #CCCCCC;
        }

        .el-table--border, .el-table--group {
            border: 1px solid #CCCCCC;
        }

        .el-table .el-table__cell{
            padding: 34px 37px 34px 37px;
        }

    
    } 
</style>