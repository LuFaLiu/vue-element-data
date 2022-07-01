<template>
    <el-radio-group v-model="resetvModel">
        <el-radio v-for="(item,index) in superParams[parentNode.radioListName]" :key="index" :label="item.lable">{{$t(item.name)}}</el-radio>
    </el-radio-group>
</template>
<script>
    import _ from "lodash";
    import { filteri18n,dynamicvModel } from '@/utils/index'
    export default{
        inject: ['superParams'],
        props:{
            parentNode:{
                type:Object
            }
        },
        computed:{
            resetvModel:{
                get(){
                    return dynamicvModel(this.superParams,this.parentNode.vModel,'','get');
                },
                set(val){
                    dynamicvModel(this.superParams,this.parentNode.vModel,val,'set');
                }
            }
        },
        methods:{
            filteri18n
        }
    }
</script>
<style lang="scss" scoped>
</style>