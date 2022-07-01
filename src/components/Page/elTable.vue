<template>
    <el-table
      :class="parentNode.class"
      :ref="parentNode.refName"
      :data="superParams[parentNode.tableDataName]"
      :tooltip-effect="parentNode.tooltipEffect"
      :style="[parentNode.style]"
      :stripe="parentNode.stripe"
      :height="superParams[parentNode.tableHeightName]"
      @selection-change="selectChange"
      :default-sort="parentNode.defaultSort"
      :row-key="parentNode.rowKey && parentNode.rowKey"
      :default-expand-all="parentNode.defaultExpandAll && parentNode.defaultExpandAll"
      :tree-props="parentNode.treeProp"
    >

      <component v-for="(item,index) in parentNode.childrenNode" :key="index" :columnIndex="index" :parentNode="item" :is="item.componentName" />
      
    </el-table>
</template>
<script>
    import elTableColumn from '@/components/Page/elTableColumn';
    export default{
        inject: ['superParams'],
        components:{
            elTableColumn
        },
        props:{
            parentNode:{
                type:Object,
                require:true
            }
        },
        data(){
            return {
              tableData:[],
              tableHeight:''
            }
        },
        watch:{
            tableComponentData:function (val) { //Resolve the problem that values passed by parent components do not update in real time
                this.tableData = val;
            }
        },
        methods:{
            indexMethod(index) {
                if (index < 9) {
                    return "0" + (index + 1);
                } else {
                    return index + 1;
                }
            },
            getObjKey(row,key){
               return _.get(row, key);
            },
            selectChange(val){ 
                var selectName = this.parentNode.selectionEvent;
                this.superParams[selectName](val);
                
            },
            tableClick(eventName,row){
                this.superParams[eventName](row);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .accountTable {
        margin-top: 20px;
        border-radius: 8px;
    }

    ::v-deep{
        .el-table__cell{
            .cell{
                display: flex!important;
            }
            
        }
    }
</style>
