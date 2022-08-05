<template>
    <el-form-item :label="parentNode.attributeName">
        <el-input type="text" v-model="parentNode[parentNode.attributeModel]" :placeholder="parentNode.inputFormat"  />
    </el-form-item>
</template>
<script>
import { filteri18n } from '@/utils/index'
export default{
    inject: ['superAddPageParams'],
    props:{
        parentNode:{
            type:Object
        }
    },
    methods:{
        filteri18n
    },
    mounted(){
        console.log(this.parentNode);
    }
}
</script>
