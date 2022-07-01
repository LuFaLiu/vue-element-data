<template>
    <el-form-item :label="$t(parentNode.attributeLabel)">
        <component v-for="(item,index) in parentNode" :parentNode="item" :key="index" :is="item.attributeType" />
    </el-form-item>
</template>
<script>
import ruleInput from '@/components/PageRule/ruleInput';
export default{
    components:{
        ruleInput
    },
    props:{
        parentNode:{
            type:Object
        }
    }
}
</script>
