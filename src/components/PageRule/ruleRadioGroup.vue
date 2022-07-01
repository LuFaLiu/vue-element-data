<template>
    <el-radio-group v-model="superParams[parentNode.paramsName][parentNode.attributeModel]">
        <el-radio v-for="(item,index) in superParams[parentNode.radioListName]" :key="index" :label="item.label">{{$t(item.name)}}</el-radio>
    </el-radio-group>
</template>
<script>
    import _ from "lodash";
    import { filteri18n } from '@/utils/index'
    export default{
        inject: ['superParams'],
        props:{
            parentNode:{
                type:Object
            }
        },
        methods:{
            filteri18n,
            getValue(){
                if(_.get(this.rowData, this.parentNode.btnCondition)){
                    return false;
                }else{
                    return true;
                }
            },
            btnClick(){
                if(this.parentNode.params){
                    this.superParams[this.parentNode.event](this.parentNode.paramsName);
                }else if(this.parentNode.tableParams){
                    this.superParams[this.parentNode.event](this.rowData);  
                } else{
                    this.superParams[this.parentNode.event]();  
                }
                
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>