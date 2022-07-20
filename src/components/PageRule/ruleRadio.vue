<template>
    <el-form-item :label="$t(parentNode.attributeLabel)">
        <el-radio v-model="parentNode[parentNode.attributeModel]" :label="true">{{$t('form.isTrue')}}</el-radio>
        <el-radio v-model="parentNode[parentNode.attributeModel]" :label="false">{{$t('form.isFalse')}}</el-radio>
    </el-form-item>
</template>
<script>
export default{
    inject: ['superAddPageParams'],
    props:{
        parentNode:{
            type:Object
        }
    }
}
</script>