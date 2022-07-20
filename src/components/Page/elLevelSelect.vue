<template>
    <el-select v-model="resetvModel" :multiple="parentNode.multiple ? true : false" :clearable="parentNode.clearable || false" :placeholder="filteri18n(parentNode.placeholder) || ''" :popper-append-to-body="false">
        <elOption v-for="(item,index) in superParams[parentNode.elOptionList]" :key="index" :node="item" />
    </el-select>
</template>
<script type="text/jsx">
    import { filteri18n,dynamicvModel } from '@/utils/index';
    import elOption from './elOption';
    export default{
        inject: ['superParams'],
        props:{
            renderContent:Function,
            searchForm:{
                type:Object
            },
            parentNode:{
                type:Object
            }
        },
        components:{
            elOption
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
        methods: {
            filteri18n
        }
    }
</script>
<style lang="scss" scoped>

</style>
