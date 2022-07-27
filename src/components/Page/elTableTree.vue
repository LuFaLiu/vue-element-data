<template>
    <div class="tableTree">
        <table-column :node="columnData" :num="numberList" :key="index" />
    </div>
</template>

<script>
import _ from 'lodash'
import TemplateScoped from './templateScoped'
export default{
    inject: ['superParams'],
    props:{
        parentNode:{
            default(){
                return {}
            }
        }
    },
    components:{
        TemplateScoped,
        TableColumn:{
            props:{
                node:{
                    default(){
                        return {}
                    }
                },
                num:{
                    default(){
                        return []
                    }
                },
            },
            render(h){
                const node = this.node;
                const num = this.num;
                console.log(node);
                const templateNode =  
                 <el-table data={node} border height={500}>
                    {
                        num.map((v,index)=> 
                        <el-table-column prop={'level'+v} label={v+'级菜单'} key={index}> 
                            {
                                h({scopedSlots:{ default: props => h('templateScoped',{props:{node:props}}) }})
                            }
                        </el-table-column>)
                    }
                </el-table>
                return (templateNode);
            }
        }
    },
    data(){
        return {
            tableData:this.superParams[this.parentNode.tableDataName],
            num:0,
            index: '',
            numberList:[],
            columnData:[],
            levelObj:{}
        }
    },
    mounted(){
       if(this.tableData && this.tableData.length > 0){
            this.deepTableDataFirstLevel(this.tableData);
            this.handleTable(this.tableData);
       }
    },
    methods:{
        deepTableDataOrderLevel(data,num,id){ //setting order level
            var that = this;
            if(that.numberList.indexOf(num) == -1){
                that.numberList.push(num);
            }
            data.filter(v=>{
                that.$set(v,'level',num);
                that.$set(v,'parentId',id);
                if(v.children && v.children.length > 0){
                    that.deepTableDataOrderLevel(v.children,(num+1),v.id)
                }
            })
        },
        deepTableDataFirstLevel(data){ //setting first level
            var that = this;
            that.num ++;
            if(that.numberList.indexOf(that.num) == -1){
                that.numberList.push(that.num);
            }
            data.filter(v=>{
                that.$set(v,'level',that.num);
                that.$set(v,'parentId',0);
                if(v.children && v.children.length > 0){
                    that.deepTableDataOrderLevel(v.children,(that.num+1),v.id)
                }
            })
        },
        handleTable(data){
            var that = this;
            that.columnData = [];
            that.levelObj = {};

            data.filter((v,index)=>{
                that.$set(that.columnData,index,{label:v.label,value:v.id,id:v.id,parentId:v.parentId})
                if(v.children && v.children.length > 0){
                    that.numberList.filter(n=>{
                        that.levelObj[('level'+n)] = [];
                    })
                    that.$set(that.columnData[index],'level1',[{label:v.label,value:v.id,id:v.id,parentId:v.parentId}]);
                    that.deepTableList(v.children,index);
                }
            })

        },
        deepTableList(data,num){
            var that = this;
            data.filter(v=>{
                if(that.numberList.indexOf(v.level) > -1){
                    that.levelObj['level'+v.level].push({label:v.label,value:v.id,id:v.id,parentId:v.parentId});
                    that.$set(that.columnData[num],'level'+v.level,that.levelObj['level'+v.level]);
                }
                if(v.children && v.children.length > 0){
                    that.deepTableList(v.children,num)
                }
            })
        }
    }

}
</script>
<style lang="scss" scoped>
    .tableTree{
        border: 1px solid #CCCCCC;
        border-radius: 8px;
        /*
        .tableTree-column {
            ::v-deep {
                .tableTree-row{
                    width: max-content;
                    border-bottom: 1px solid #CCCCCC;
                    padding: 34px 37px 34px 37px;
                    border-right: 1px solid #CCCCCC;
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
        */
        
    }
    
</style>
