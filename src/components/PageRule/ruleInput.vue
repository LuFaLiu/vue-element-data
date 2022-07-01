<template>
    <el-form-item :label="$t(parentNode.attributeLabel)">
        <el-input type="text" v-model="parentNode[parentNode.attributeModel]"  />
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
    }
}
</script>
