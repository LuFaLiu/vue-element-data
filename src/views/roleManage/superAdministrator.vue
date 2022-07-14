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
    import { resizeObserver } from '@/utils/index'
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
            //Set a fixed height when mounting the interface
            that.$nextTick(function () {
                that.tableHeight = resizeObserver("el-main",["el-col-8"],125);
            })
        },
        methods:{
            //Listen for browser window changes
            onResize() {
                this.tableHeight = resizeObserver("el-main",["el-col-8"],125);
            },
            searchCurrentMenu(id,list){
                //children,type,parentId A child always has a parent (parentId) pointing to the parent
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
                    this.permTreeData = res.data.data; //Menu list
                    this.deepPermTreeData = [];
                    this.deepMenuList(res.data.data); //Menu list flattens out

                    sysRoleApi.getRoleMenuInfo(id).then(res2 => { //List of existing permissions
                        this.roleType = res2.data.data.name;
                        this.permForm = res2.data.data;
                        this.deepPermTreeData.filter(v=>{ //Menu list to match
                            if(res2.data.data.menuIds.indexOf(v.id) > -1){ //Match menu information format with existing permission ID: [1,2,3,4,5,6]
                                this.$set(v,'checked',true); //Set state to check if it exists
                            }else {
                                this.$set(v,'checked',false); //Set state to uncheck if it does not exist
                            }
                        });
                    })

                })
            },
            deepMenuList(data){
                data.filter(v=>{
                    this.deepPermTreeData.push(v);
                    if(v.children){ //Can not add v.children.length > 0 Otherwise, subsequent execution will be skipped
                        this.deepMenuList(v.children,v.id,v.type);
                    }
                })
                
            },
            //Perform the check operation
            checkMenu(row){
                var selectItem = [];
                this.parentIdList = [];

                this.searchParent(row);

                this.deepPermTreeData.filter(v=>{
                    if(v.checked == true){ //Filter the checked items
                        selectItem.push(v.id);
                    }
                })

                sysRoleApi.grantRolePermission(this.permForm.id, selectItem).then(res => {         
                    if(res.data.code == 200){ //The successful state
                        this.$message({
                            showClose: true,
                            message: this.$t('tip.success'),
                            type: 'success',
                            duration:500,
                            onClose: () => {
                                getSysMenu(); //Re-attribute the route list
                                //this.getRoleManageList(this.$router.currentRoute.query.id);
                            }
                        })
                    }else { //If the interface is in the failed state, reobtain it and select it again
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
            //Find the parent ID
            searchParent(row){
                //this.$set(v,'checked',false);
               this.deepPermTreeData.filter(v=>{
                        if(row.parentId == 0){ //The current level is the highest
                            if(row.id == v.parentId){ //Current highest level sublevel
                                if(row.checked){ //The current element is checked
                                    this.$set(v,'checked',true); //Checks the children of the current element
                                    this.checkedparams(row.children); //Check the associated elements
                                }else { //The current element is unselected
                                    this.$set(v,'checked',false); //Uncheck the children of the current element
                                    this.unCheckedparams(row.children); //Deselect the associated element
                                }
                            }
                        }else {
                            if(v.id == row.parentId){ //The current level is not the highest level/parent of the current element
                                if(row.checked){ //The current element is checked
                                    this.$set(v,'checked',true); //Check the parent
                                    var idList = [];
                                    idList.push(v.parentId);
                                    this.checkedRoleList(idList); //Select the corresponding permission
                                    this.checkedparams(row.children); //Check the associated elements
                                }else{ //The current element is unchecked
                                    this.deepunCheckedRoleList(v,row.id); //Deselect the parent element
                                    this.unCheckedparams(row.children); //Deselect child elements
                                }
                            }
                    
                        }
               })
            },
            //Check the associated elements
            checkedparams(row){
               this.checkList = [];
               this.deepCheckedChildList(row);
               this.checkedRoleList(this.checkList);
            },

            //Deselect the associated element
            unCheckedparams(row){
               this.checkList = [];
               this.deepCheckedChildList(row);
               this.unCheckedRoleList(this.checkList);
            },
            //Select the corresponding permission
            checkedRoleList(idList){
                this.deepPermTreeData.filter(v=>{
                    if(idList.indexOf(v.id) > -1){
                        this.$set(v,'checked',true); 
                    }
                })
            },
            //Deselect the corresponding permission
            unCheckedRoleList(idList){
                this.deepPermTreeData.filter(v=>{
                    if(idList.indexOf(v.id) > -1){
                        this.$set(v,'checked',false); 
                    }
                })
            },
            //Recursively traverses the list of child levels
            deepunCheckedRoleList(list,id){
                var isChecked = [];
                //var unChecked = [];
                isChecked = _.filter(list.children,['checked',false]); //Nodes at the same level are not selected
                //unChecked = _.filter(list.children,['checked',true]); //Nodes selected at the same level
                if(isChecked.length == list.children.length){ //All sibling elements are unchecked
                    var listId = [];
                    listId.push(list.id);
                    this.unCheckedRoleList(listId); //Deselect the parent level
                    if(list.parentId != 0){ //The current level is not superlative/a sublevel list exists
                        var parentObj = this.searchRoleList(list.parentId); //Find the sibling of the parent
                        this.deepunCheckedRoleList(parentObj,parentObj.id); //Recurse when there are sublists
                    }
                }
            },
            //Find the corresponding parent node list
            searchRoleList(id){
                var list = {};
                this.deepPermTreeData.filter(v=>{
                    if(id == v.id){
                        list = v;
                    }
                })
                return list;
            },
            //Iterates over the ID of the current list item
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
                // Leave the page and remove the detector and all listeners
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
