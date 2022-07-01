<template>
    <el-form-item :label="parentNode.attributeLabel">
        <el-radio v-model="superAddPageParams[parentNode.attributeModel]" label="1">{{$t('form.isTrue')}}</el-radio>
        <el-radio v-model="superAddPageParams[parentNode.attributeModel]" label="2">{{$t('form.isFalse')}}</el-radio>
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