<template>
    <el-row class="adminConfig" v-resize="onResize">
        <el-col :span="8">
            <div class="dataCout_title">{{roleType}}</div>
            <div class="adminConfig_tip">提示：勾选后立即生效，不需要再保存</div>
           
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
                            <el-checkbox  v-model="scope.row.checked"  @change="checkMenu(scope.row)">{{scope.row.name}}</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="二级菜单"
                    width="300">
                        <template slot-scope="scope">
                            <el-checkbox v-for="(item,index) in  searchCurrentMenu(scope.row.id)" :key="index" v-model="item.checked" @change="checkMenu(item)">{{item.name}}</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="三级菜单">
                        <template slot-scope="scope">
                            <el-checkbox v-for="(item,index) in searchCurrentMenu(scope.row.id,scope.row.children)" :key="index" v-model="item.checked" @change="checkMenu(item)">{{item.name}}</el-checkbox>
                        </template>
                    </el-table-column>
            </el-table>


        </el-col>
    </el-row>
</template>
<script>
    import sysRoleApi from '@/api/sysRoleApi'
    import sysMenuApi from '@/api/sysMenuApi'
    import { getSysMenu } from '@/api/commonApi'
    import { resizeObserver } from '@/utils/auth'
    import _ from 'lodash'
    export default{
        data(){
            return {
                checked:true,
                roleType:'',
                permTreeData:[],
                deepPermTreeData:[],
                parentIdList:[],
                checkList:[],
                tableHeight: 0
            }
        },
        created(){
           this.getRoleManageList(this.$router.currentRoute.query.id);
        },
        mounted() {
            var that = this;
            //界面挂载时设置固定高度
            that.$nextTick(function () {
                that.tableHeight = resizeObserver("el-main",["el-col-8"],125);
            })
        },
        methods:{
            //监听浏览器窗口变化
            onResize() {
                this.tableHeight = resizeObserver("el-main",["el-col-8"],125);
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

            getRoleManageList(id){
                sysMenuApi.getMenuList().then(res => {
                    this.permTreeData = res.data.data; //菜单列表
                    this.deepPermTreeData = [];
                    this.deepMenuList(res.data.data); //菜单列表扁平化

                    sysRoleApi.getRoleMenuInfo(id).then(res2 => { //已存在的权限列表
                        this.roleType = res2.data.data.name;
                        this.permForm = res2.data.data;
                        this.deepPermTreeData.filter(v=>{ //菜单列表进行匹配
                            if(res2.data.data.menuIds.indexOf(v.id) > -1){ //用已有权限id去匹配菜单信息 格式：[1,2,3,4,5,6]
                                this.$set(v,'checked',true); //存在时把状态设置为勾选
                            }else {
                                this.$set(v,'checked',false); //不存在时把状态设置为取消勾选
                            }
                        });
                    })

                })
            },
            deepMenuList(data){
                data.filter(v=>{
                    this.deepPermTreeData.push(v);
                    if(v.children){ //不能添加v.children.length > 0否则会跳过后面的执行
                        this.deepMenuList(v.children,v.id,v.type);
                    }
                })
                
            },
            //进行勾选操作
            checkMenu(row){
                var selectItem = [];
                this.parentIdList = [];

                this.searchParent(row);

                this.deepPermTreeData.filter(v=>{
                    if(v.checked == true){ //筛选已勾选项
                        selectItem.push(v.id);
                    }
                })

                sysRoleApi.grantRolePermission(this.permForm.id, selectItem).then(res => {         
                    if(res.data.code == 200){ //成功状态
                        this.$message({
                            showClose: true,
                            message: '恭喜你，操作成功',
                            type: 'success',
                            duration:500,
                            onClose: () => {
                                getSysMenu(); //重新属性路由列表
                                //this.getRoleManageList(this.$router.currentRoute.query.id);
                            }
                        })
                    }else { //失败状态时重新获取接口重新勾选上
                        sysRoleApi.getRoleMenuInfo(this.$router.currentRoute.query.id).then(res2 => {
                            this.roleType = res2.data.data.name;
                            this.permForm = res2.data.data;
                            this.deepPermTreeData.filter(v=>{
                                if(res2.data.data.menuIds.indexOf(v.id) > -1){
                                    this.$set(v,'checked',true);
                                }else {
                                    this.$set(v,'checked',false);
                                }
                            });
                        })

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
                                    this.checkedparams(row.children); //勾选相关联的元素
                                }else { //当前元素为取消勾选状态
                                    this.$set(v,'checked',false); //对当前元素的子级取消勾选
                                    this.unCheckedparams(row.children); //取消勾选相关联的元素
                                }
                            }
                        }else {
                            if(v.id == row.parentId){ //当前级别不是最高级别/当前元素父级
                                if(row.checked){ //当前元素已勾选
                                    this.$set(v,'checked',true); //勾选父级
                                    var idList = [];
                                    idList.push(v.parentId);
                                    this.checkedRoleList(idList); //勾选对应的权限
                                    this.checkedparams(row.children); //勾选相关联的元素
                                }else{ //当前元素取消勾选
                                    this.deepunCheckedRoleList(v,row.id); //取消勾选父级元素
                                    this.unCheckedparams(row.children); //取消勾选子级元素
                                }
                            }
                    
                        }
               })
            },
            //勾选相关联的元素
            checkedparams(row){
               this.checkList = [];
               this.deepCheckedChildList(row);
               this.checkedRoleList(this.checkList);
            },

            //取消勾选相关联的元素
            unCheckedparams(row){
               this.checkList = [];
               this.deepCheckedChildList(row);
               this.unCheckedRoleList(this.checkList);
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
            //递归遍历子级列表
            deepunCheckedRoleList(list,id){
                var isChecked = [];
                //var unChecked = [];
                isChecked = _.filter(list.children,['checked',false]); //同级节点未勾选节点
                //unChecked = _.filter(list.children,['checked',true]); //同级已勾选的节点
                if(isChecked.length == list.children.length){ //同级元素都取消勾选
                    var listId = [];
                    listId.push(list.id);
                    this.unCheckedRoleList(listId); //取消勾选父级
                    if(list.parentId != 0){ //当前级别不是最高级/存在子级列表
                        var parentObj = this.searchRoleList(list.parentId); //找出父级的同级
                        this.deepunCheckedRoleList(parentObj,parentObj.id); //存在子列表时再进行递归
                    }
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
            //遍历出当前列表项的id
            deepCheckedChildList(row){
                row.filter(v=>{
                    this.checkList.push(v.id);
                    if(v.children){
                        this.deepCheckedChildList(v.children);
                    }
                })
            },
            beforeDestroy() {
                let _this = this
                // 离开页面删除检测器和所有侦听器
                _this.resizeObserver.disconnect();
            }
        }
    }
    
</script>
<style lang="scss" scoped>
    .adminConfig{
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
        .config_table{
            margin-top: 35px;
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

        .el-table__cell:first-child .cell {
            width: fit-content;
        }

        
    }   

    
</style>
