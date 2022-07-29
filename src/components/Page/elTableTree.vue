<template>
    <div class="tableTree">
        <table-column :node="columnData" :num="numberList" :key="index" />
    </div>
</template>

<script>
import _ from 'lodash'
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
                const superParams = this.$parent.superParams;
                const parentNode = this.$parent.parentNode;
                const parent = this.$parent;
                const node = this.node;
                const num = this.num;
                let tableRowList = []; //防止重复数据
                let rowIdList = [];
                const renderContent = (row, column, cellValue, index) => { //格式化内容
                    //()=>parent.checkMenu(row) 防止立刻触发
                    cellValue && cellValue.filter(v=>{
                        if(rowIdList.indexOf(v.id) == -1){
                            rowIdList.push(v.id);
                            tableRowList.push(v);
                        }
                    })
                    return cellValue && cellValue.map((item,index) => <el-checkbox v-on:change={()=>superParams.checkMenu(item,tableRowList)} v-model={item.checked}>{item.label}</el-checkbox>)
                }
                const templateNode =  
                 <el-table data={node} border height={superParams[parentNode.tableHeightName]}>
                    {
                        num.map((v,index)=> <el-table-column width={v > 2 ? 350 : 180} prop={'level'+v} label={'level'+v} key={index} formatter={renderContent} />)
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
            index: '', //自定义列内容出现index未定义报错，需加上index参数
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
        deepTableDataFirstLevel(data){ //setting first level 第一层
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
        deepTableDataOrderLevel(data,num,id){ //setting order level 其他层级
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

        handleTable(data){ //setting first level 第一层
            var that = this;
            that.columnData = [];
            that.levelObj = {};

            data.filter((v,index)=>{
                that.$set(that.columnData,index,{label:v.label,value:v.id,id:v.id,parentId:v.parentId})
                if(v.children && v.children.length > 0){
                    that.numberList.filter(n=>{
                        that.levelObj[('level'+n)] = [];
                    })
                    that.$set(that.columnData[index],'level1',[{label:v.label,value:v.id,id:v.id,parentId:v.parentId,checked:false}]);
                    that.deepTableList(v.children,index);
                }
            })

        },

        deepTableList(data,num){ //setting order level 其他层级
            var that = this;
            data.filter(v=>{
                if(that.numberList.indexOf(v.level) > -1){
                    that.levelObj['level'+v.level].push({label:v.label,value:v.id,id:v.id,parentId:v.parentId,checked:false});
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
    
</style>
