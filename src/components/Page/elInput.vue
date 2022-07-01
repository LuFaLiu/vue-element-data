<template>
    <el-input
        :type="parentNode.inputType"
        v-model="resetvModel"
        :placeholder="filteri18n(parentNode.placeholder) || ''"
        :disabled="parentNode.inputCondition ? (superParams[parentNode.inputCondition] ? true : false) : parentNode.disabled"
        clearable
    />
</template>
<script>
import { filteri18n,dynamicvModel } from '@/utils/index'
export default{
    inject: ['superParams'],
    props:{
        paramsData:{
            type:Object
        },
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
    methods: {
        filteri18n,
    }
}
</script>
